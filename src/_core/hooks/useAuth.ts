import { currentUser } from '@/data/mock'

export function useAuth() {
  return {
    loading: false,
    user: currentUser,
    logout: () => {},
  }
}
