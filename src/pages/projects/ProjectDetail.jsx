import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import Button from '@/components/ui/Button'
import Tabs from '@/components/ui/Tabs'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Breadcrumb from '@/components/ui/Breadcrumb'
import EmptyState from '@/components/ui/EmptyState'
import { PageSpinner } from '@/components/ui/Spinner'
import useStore from '@/store/useStore'
import SecretManager from '@/pages/secrets/SecretManager'
import TeamManagement from '@/pages/team/TeamManagement'
import AuditLogs from '@/pages/audit/AuditLogs'

export default function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    currentProject, fetchProject,
    environments, fetchEnvironments, createEnvironment,
  } = useStore()
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('secrets')
  const [activeEnv, setActiveEnv] = useState(null)
  const [showEnvModal, setShowEnvModal] = useState(false)
  const [envName, setEnvName] = useState('')
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    if (!id) return
    Promise.all([
      fetchProject(id),
      fetchEnvironments(id),
    ]).finally(() => setLoading(false))
  }, [id])

  useEffect(() => {
    if (environments.length > 0 && !activeEnv) {
      setActiveEnv(environments[0])
    }
  }, [environments])

  const handleCreateEnv = async (e) => {
    e.preventDefault()
    if (!envName.trim()) return
    setCreating(true)
    try {
      const env = await createEnvironment(id, envName)
      setActiveEnv(env)
      setShowEnvModal(false)
      setEnvName('')
    } finally {
      setCreating(false)
    }
  }

  if (loading) return <PageSpinner />
  if (!currentProject) return <p className="text-text-secondary">Project not found</p>

  const envList = Array.isArray(environments) ? environments : []
  const tabItems = [
    { key: 'secrets', label: 'Secrets', count: envList.reduce((s, e) => s + (e.secret_count || 0), 0) },
    { key: 'environments', label: 'Environments', count: envList.length },
    { key: 'team', label: 'Team' },
    { key: 'audit', label: 'Audit log' },
  ]

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Projects', href: '/' },
          { label: currentProject.name },
        ]}
      />

      <div className="mt-4 mb-6">
        <h1 className="text-xl font-semibold text-text-primary">{currentProject.name}</h1>
        {currentProject.description && (
          <p className="text-sm text-text-secondary mt-0.5">{currentProject.description}</p>
        )}
      </div>

      <Tabs items={tabItems} activeTab={activeTab} onChange={setActiveTab} />

      <div className="mt-6">
        {activeTab === 'secrets' && (
          <div>
            {envList.length === 0 ? (
              <EmptyState
                icon={null}
                title="No environments"
                description="Create an environment first to add secrets."
                action={
                  <Button variant="primary" onClick={() => setShowEnvModal(true)}>
                    <Plus size={16} /> Create environment
                  </Button>
                }
              />
            ) : (
              <>
                <div className="flex items-center gap-2 mb-4">
                  {envList.map((env) => (
                    <button
                      key={env.id}
                      onClick={() => setActiveEnv(env)}
                      className={`px-3 py-1.5 text-sm rounded-md border cursor-pointer transition-colors ${
                        activeEnv?.id === env.id
                          ? 'bg-canvas-subtle border-link text-link'
                          : 'border-border-default text-text-secondary hover:text-text-primary hover:bg-canvas-subtle'
                      }`}
                    >
                      <Badge variant={env.name}>{env.name}</Badge>
                    </button>
                  ))}
                </div>
                {activeEnv && <SecretManager environmentId={activeEnv.id} />}
              </>
            )}
          </div>
        )}

        {activeTab === 'environments' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-text-primary">Environments</h2>
              <Button variant="secondary" size="sm" onClick={() => setShowEnvModal(true)}>
                <Plus size={14} /> New environment
              </Button>
            </div>
            {envList.length === 0 ? (
              <EmptyState icon={null} title="No environments" description="Add development, staging, or production environments." />
            ) : (
              <div className="grid gap-3">
                {envList.map((env) => (
                  <Card key={env.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant={env.name}>{env.name}</Badge>
                      <span className="text-xs text-text-tertiary">{env.secret_count || 0} secrets</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => { setActiveEnv(env); setActiveTab('secrets') }}
                    >
                      View secrets
                    </Button>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'team' && <TeamManagement projectId={id} />}
        {activeTab === 'audit' && <AuditLogs projectId={id} />}
      </div>

      <Modal
        open={showEnvModal}
        onClose={() => setShowEnvModal(false)}
        title="New environment"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowEnvModal(false)}>Cancel</Button>
            <Button variant="primary" loading={creating} onClick={handleCreateEnv}>Create</Button>
          </>
        }
      >
        <Input
          label="Environment name"
          placeholder="development"
          value={envName}
          onChange={(e) => setEnvName(e.target.value)}
        />
        <p className="text-xs text-text-tertiary mt-2">
          Common names: development, staging, production
        </p>
      </Modal>
    </div>
  )
}
