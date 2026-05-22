import { create } from 'zustand'
import api from '@/services/api'

const useStore = create((set, get) => ({
  // Auth
  user: null,
  token: localStorage.getItem('envx_token'),

  setUser: (user) => set({ user }),
  setToken: (token) => {
    localStorage.setItem('envx_token', token)
    set({ token })
  },

  login: async (email, password) => {
    const { data } = await api.post('/api/v1/auth/login', { email, password })
    localStorage.setItem('envx_token', data.token)
    set({ user: data.user, token: data.token })
    return data
  },

  register: async (name, email, password) => {
    const { data } = await api.post('/api/v1/auth/register', { name, email, password })
    localStorage.setItem('envx_token', data.token)
    set({ user: data.user, token: data.token })
    return data
  },

  logout: () => {
    localStorage.removeItem('envx_token')
    set({ user: null, token: null })
  },

  loadUser: async () => {
    try {
      const { data } = await api.get('/api/v1/auth/me')
      set({ user: data })
    } catch {
      localStorage.removeItem('envx_token')
      set({ user: null, token: null })
    }
  },

  // Projects
  projects: [],
  currentProject: null,

  fetchProjects: async () => {
    const { data } = await api.get('/api/v1/projects')
    set({ projects: data })
  },

  createProject: async (payload) => {
    const { data } = await api.post('/api/v1/projects', payload)
    set((state) => ({ projects: [...state.projects, data] }))
    return data
  },

  fetchProject: async (id) => {
    const { data } = await api.get(`/api/v1/projects/${id}`)
    set({ currentProject: data })
    return data
  },

  // Environments
  environments: [],

  fetchEnvironments: async (projectId) => {
    const { data } = await api.get(`/api/v1/projects/${projectId}/environments`)
    set({ environments: data })
    return data
  },

  createEnvironment: async (projectId, name) => {
    const { data } = await api.post(`/api/v1/projects/${projectId}/environments`, { name })
    set((state) => ({ environments: [...state.environments, data] }))
    return data
  },

  // Secrets
  secrets: [],

  fetchSecrets: async (envId) => {
    const { data } = await api.get(`/api/v1/environments/${envId}/secrets`)
    set({ secrets: data })
    return data
  },

  createSecret: async (envId, payload) => {
    const { data } = await api.post(`/api/v1/environments/${envId}/secrets`, payload)
    set((state) => ({ secrets: [...state.secrets, data] }))
    return data
  },

  updateSecret: async (secretId, payload) => {
    const { data } = await api.put(`/api/v1/secrets/${secretId}`, payload)
    set((state) => ({
      secrets: state.secrets.map((s) => (s.id === secretId ? data : s)),
    }))
    return data
  },

  deleteSecret: async (secretId) => {
    await api.delete(`/api/v1/secrets/${secretId}`)
    set((state) => ({ secrets: state.secrets.filter((s) => s.id !== secretId) }))
  },

  // Team
  members: [],

  fetchMembers: async (projectId) => {
    const { data } = await api.get(`/api/v1/projects/${projectId}/members`)
    set({ members: data })
    return data
  },

  addMember: async (projectId, payload) => {
    const { data } = await api.post(`/api/v1/projects/${projectId}/members`, payload)
    set((state) => ({ members: [...state.members, data] }))
    return data
  },

  removeMember: async (projectId, userId) => {
    await api.delete(`/api/v1/projects/${projectId}/members/${userId}`)
    set((state) => ({ members: state.members.filter((m) => m.id !== userId) }))
  },

  // Audit
  auditLogs: [],

  fetchAuditLogs: async (projectId) => {
    const { data } = await api.get(`/api/v1/projects/${projectId}/audit-logs`)
    set({ auditLogs: data })
    return data
  },
}))

export default useStore
