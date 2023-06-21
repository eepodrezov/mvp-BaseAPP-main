import { queryFetchFactory } from '@/shared/lib'
import { User, CURRENT_VIEWER_REQUEST_TARGET } from '../lib'

export const queryFetchCurrentViewer = queryFetchFactory<User>(CURRENT_VIEWER_REQUEST_TARGET)
