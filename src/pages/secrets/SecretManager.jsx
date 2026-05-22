import { useState, useEffect } from 'react'
import { Plus, Eye, EyeOff, Edit3, Trash2, Copy } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Table from '@/components/ui/Table'
import Modal from '@/components/ui/Modal'
import EmptyState from '@/components/ui/EmptyState'
import { PageSpinner } from '@/components/ui/Spinner'
import { useToast } from '@/components/ui/Toast'
import useStore from '@/store/useStore'

export default function SecretManager({ environmentId }) {
  const { secrets, fetchSecrets, createSecret, updateSecret, deleteSecret } = useStore()
  const { addToast } = useToast()
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [secretKey, setSecretKey] = useState('')
  const [secretValue, setSecretValue] = useState('')
  const [revealed, setRevealed] = useState({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (environmentId) {
      fetchSecrets(environmentId).finally(() => setLoading(false))
    }
  }, [environmentId])

  const openCreate = () => {
    setEditing(null)
    setSecretKey('')
    setSecretValue('')
    setShowModal(true)
  }

  const openEdit = (secret) => {
    setEditing(secret)
    setSecretKey(secret.key)
    setSecretValue('')
    setShowModal(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!secretKey.trim()) return
    setSaving(true)
    try {
      if (editing) {
        await updateSecret(editing.id, { key: secretKey, value: secretValue || undefined })
        addToast({ variant: 'success', message: 'Secret updated' })
      } else {
        await createSecret(environmentId, { key: secretKey, value: secretValue })
        addToast({ variant: 'success', message: 'Secret created' })
      }
      setShowModal(false)
    } catch (err) {
      addToast({ variant: 'error', message: err.response?.data?.message || 'Failed to save secret' })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (secret) => {
    if (!confirm(`Delete "${secret.key}"?`)) return
    try {
      await deleteSecret(secret.id)
      addToast({ variant: 'success', message: 'Secret deleted' })
    } catch {
      addToast({ variant: 'error', message: 'Failed to delete secret' })
    }
  }

  const toggleReveal = (id) => {
    setRevealed((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  if (loading) return <PageSpinner />

  const columns = [
    {
      key: 'key',
      label: 'Name',
      render: (row) => (
        <span className="font-mono text-sm text-text-primary">{row.key}</span>
      ),
    },
    {
      key: 'value',
      label: 'Value',
      render: (row) => (
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm text-text-secondary">
            {revealed[row.id] ? row.value : '●●●●●●●●●●'}
          </span>
          <button
            onClick={() => toggleReveal(row.id)}
            className="text-text-tertiary hover:text-text-primary cursor-pointer"
            title={revealed[row.id] ? 'Hide' : 'Reveal'}
          >
            {revealed[row.id] ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>
      ),
    },
    {
      key: 'updated_at',
      label: 'Updated',
      render: (row) => (
        <span className="text-sm text-text-tertiary">
          {row.updated_at ? new Date(row.updated_at).toLocaleDateString() : '-'}
        </span>
      ),
    },
    {
      key: 'actions',
      label: '',
      width: '100px',
      render: (row) => (
        <div className="flex items-center gap-1">
          <button onClick={() => openEdit(row)} className="p-1 text-text-tertiary hover:text-text-primary cursor-pointer" title="Edit">
            <Edit3 size={14} />
          </button>
          <button onClick={() => handleDelete(row)} className="p-1 text-text-tertiary hover:text-danger cursor-pointer" title="Delete">
            <Trash2 size={14} />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-text-primary">Secrets</h2>
        <Button variant="primary" size="sm" onClick={openCreate}>
          <Plus size={14} /> New secret
        </Button>
      </div>

      <Table
        columns={columns}
        data={secrets}
        emptyState={
          <EmptyState
            title="No secrets yet"
            description="Add your first environment variable to this environment."
            action={
              <Button variant="primary" size="sm" onClick={openCreate}>
                <Plus size={14} /> Add secret
              </Button>
            }
          />
        }
      />

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title={editing ? 'Edit secret' : 'New secret'}
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" loading={saving} onClick={handleSave}>
              {editing ? 'Save changes' : 'Add secret'}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Name"
            placeholder="DATABASE_URL"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            disabled={!!editing}
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-primary">Value</label>
            <textarea
              placeholder="postgresql://..."
              value={secretValue}
              onChange={(e) => setSecretValue(e.target.value)}
              rows={4}
              className="w-full rounded-md border border-border-default bg-canvas-inset px-3 py-1.5 text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-link focus:border-transparent font-mono"
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}
