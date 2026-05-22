import { useState, useEffect } from 'react'
import Table from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import EmptyState from '@/components/ui/EmptyState'
import { PageSpinner } from '@/components/ui/Spinner'
import Pagination from '@/components/ui/Pagination'
import useStore from '@/store/useStore'

const actionColors = {
  created: 'success',
  updated: 'warning',
  deleted: 'danger',
}

export default function AuditLogs({ projectId }) {
  const { auditLogs, fetchAuditLogs } = useStore()
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (projectId) {
      fetchAuditLogs(projectId).finally(() => setLoading(false))
    }
  }, [projectId])

  if (loading) return <PageSpinner />

  const columns = [
    {
      key: 'created_at',
      label: 'Time',
      render: (row) => (
        <span className="text-sm text-text-secondary">
          {row.created_at ? new Date(row.created_at).toLocaleString() : '-'}
        </span>
      ),
    },
    {
      key: 'user',
      label: 'User',
      render: (row) => (
        <span className="text-sm text-text-primary">{row.user_name || row.user_email || 'Unknown'}</span>
      ),
    },
    {
      key: 'action',
      label: 'Action',
      render: (row) => (
        <Badge variant={actionColors[row.action] || 'default'}>{row.action}</Badge>
      ),
    },
    {
      key: 'resource',
      label: 'Resource',
      render: (row) => (
        <span className="text-sm font-mono text-text-primary">{row.resource_type}:{row.resource_id?.slice(0, 8)}</span>
      ),
    },
  ]

  return (
    <div>
      <Table
        columns={columns}
        data={auditLogs}
        emptyState={
          <EmptyState title="No audit logs" description="Activity will appear here as you use the project." />
        }
      />
    </div>
  )
}
