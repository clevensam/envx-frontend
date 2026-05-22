import { useState, useEffect } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Table from '@/components/ui/Table'
import Modal from '@/components/ui/Modal'
import Badge from '@/components/ui/Badge'
import Avatar from '@/components/ui/Avatar'
import EmptyState from '@/components/ui/EmptyState'
import { PageSpinner } from '@/components/ui/Spinner'
import { useToast } from '@/components/ui/Toast'
import useStore from '@/store/useStore'

export default function TeamManagement({ projectId }) {
  const { members, fetchMembers, addMember, removeMember } = useStore()
  const { addToast } = useToast()
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('member')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (projectId) {
      fetchMembers(projectId).finally(() => setLoading(false))
    }
  }, [projectId])

  const handleInvite = async (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setSaving(true)
    try {
      await addMember(projectId, { email, role })
      addToast({ variant: 'success', message: 'Member invited' })
      setShowModal(false)
      setEmail('')
      setRole('member')
    } catch (err) {
      addToast({ variant: 'error', message: err.response?.data?.message || 'Failed to invite member' })
    } finally {
      setSaving(false)
    }
  }

  const handleRemove = async (member) => {
    if (!confirm(`Remove ${member.name || member.email} from this project?`)) return
    try {
      await removeMember(projectId, member.id)
      addToast({ variant: 'success', message: 'Member removed' })
    } catch {
      addToast({ variant: 'error', message: 'Failed to remove member' })
    }
  }

  if (loading) return <PageSpinner />

  const columns = [
    {
      key: 'user',
      label: 'User',
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar name={row.name} size={28} />
          <div>
            <p className="text-sm font-medium text-text-primary">{row.name || 'Unknown'}</p>
            <p className="text-xs text-text-tertiary">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      label: 'Role',
      render: (row) => <Badge variant={row.role}>{row.role}</Badge>,
    },
    {
      key: 'actions',
      label: '',
      width: '80px',
      render: (row) =>
        row.role === 'admin' ? (
          <button
            onClick={() => handleRemove(row)}
            className="p-1 text-text-tertiary hover:text-danger cursor-pointer"
            title="Remove"
          >
            <Trash2 size={14} />
          </button>
        ) : null,
    },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-text-primary">Team members</h2>
        <Button variant="primary" size="sm" onClick={() => setShowModal(true)}>
          <Plus size={14} /> Invite member
        </Button>
      </div>

      <Table
        columns={columns}
        data={members}
        emptyState={
          <EmptyState title="No members" description="Invite team members to collaborate." />
        }
      />

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Invite member"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" loading={saving} onClick={handleInvite}>Invite</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Email address"
            type="email"
            placeholder="colleague@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Select
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            options={[
              { value: 'member', label: 'Member — can view and edit secrets' },
              { value: 'admin', label: 'Admin — can manage members and settings' },
            ]}
          />
        </div>
      </Modal>
    </div>
  )
}
