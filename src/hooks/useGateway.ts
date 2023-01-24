
import api from 'api'
import {useQuery} from 'react-query'
import {GatewayHookInterface, Gateway} from 'types/gateway'

function transformResponse(results: { data: Array<object> }): Gateway[] {
  return results.data.map(
    (result: any) => ({
      gatewayId: result.gatewayId,
      name: result.name,
    })
  )
}

async function getGateways() {
  const {data} = await api.get('/gateways')
  return data
}

export default function useGateways(): GatewayHookInterface {
  const {data, isLoading} = useQuery('gateways', getGateways, {
    select: transformResponse,
  })
  const gateways = data || null;
  return {gateways, isLoading}
}
