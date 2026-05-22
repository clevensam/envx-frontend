import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, FolderGit2, Lock, Users } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import EmptyState from '@/components/ui/EmptyState'
import { PageSpinner } from '@/components/ui/Spinner'
import useStore from '@/store/useStore'

export default function Dashboard() {
  const navigate = useNavigate()
  const { projects, fetchProjects, createProject } = useStore()
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [newName, setNewName] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    fetchProjects().finally(() => setLoading(false))
  }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!newName.trim()) return
    setCreating(true)
    try {
      const project = await createProject({ name: newName, description: newDesc })
      setShowModal(false)
      setNewName('')
      setNewDesc('')
      navigate(`/projects/${project.id}`)
    } finally {
      setCreating(false)
    }
  }

  if (loading) return <PageSpinner />

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-text-primary">Projects</h1>
          <p className="text-sm text-text-secondary mt-0.5">Manage your environment variables across projects</p>
        </div>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <Plus size={16} />
          New project
        </Button>
      </div>

      {projects.length === 0 ? (
        <EmptyState
          icon={FolderGit2}
          title="No projects yet"
          description="Create your first project to start managing secrets and environment variables."
          action={
            <Button variant="primary" onClick={() => setShowModal(true)}>
              <Plus size={16} />
              Create project
            </Button>
          }
        />
      ) : (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project.id}
              hover
              className="p-4"
              onClick={() => navigate(`/projects/${project.id}`)}
            >
              <div className="flex items-start gap-3">
                <div className="rounded-md border border-border-default bg-canvas-subtle p-2">
                  <Lock size={20} className="text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-text-primary truncate">{project.name}</h3>
                  {project.description && (
                    <p className="text-xs text-text-secondary mt-0.5 truncate">{project.description}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3 mt-3 text-xs text-text-tertiary">
                <span className="flex items-center gap-1">
                  <Users size={14} />
                  {project.member_count || 1}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="New project"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" loading={creating} onClick={handleCreate}>Create project</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Project name"
            placeholder="my-awesome-api"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
          />
          <Input
            label="Description (optional)"
            placeholder="A short description"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  )
}
