import { ConfigProvider } from 'antd'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { NotificationProvider } from '@/hooks/useNotification'
import { Root } from '@/routes/Routes'
import { store } from '@/redux/store'
import { env } from '@/utils/env'
import { ComponentToken } from '@/theme/componentToken'
import { GlobalToken } from '@/theme/globalToken'
import uzUZ from 'antd/es/locale/uz_UZ'

const queryClient = new QueryClient()

const App = () => {
  return (
    <ConfigProvider
      theme={{
        components: ComponentToken,
        token: GlobalToken
      }}
      locale={uzUZ}
    >
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <NotificationProvider>
            <Root />
            {env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
          </NotificationProvider>
        </Provider>
      </QueryClientProvider>
    </ConfigProvider>
  )
}

export default App
