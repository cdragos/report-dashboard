
import api from 'api'
import {useQuery} from 'react-query'
import {GatewayContextInterface, Gateway} from 'types/gateway'

function transformResponse(data: any): Gateway {
  const gateway = data.data[0]
  return {
    gatewayId: gateway.gatewayId,
    name: gateway.name,
  }
}

async function getGateways() {
  const {data} = await api.get('/gateways')
  return data
}

export default function useGateways(): GatewayContextInterface {
  const {data: gateways, isLoading} = useQuery('gateways', getGateways, {
    select: transformResponse,
  })

  return {gateways, isLoading}
}
