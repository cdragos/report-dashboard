import api from 'api'
import {useQuery} from 'react-query'
import {GatewayHookInterface, Gateway} from 'types/gateway'

/**
 * Transforms the response from the API into a more usable format
 * @param {Object} results - The results from the API
 * @returns {Gateway[]} - An array of gateways
 */
function transformResponse(results: { data: Array<object> }): Gateway[] {
  return results.data.map(
    (result: any) => ({
      gatewayId: result.gatewayId,
      name: result.name,
    })
  )
}

/**
 * Fetches the gateways from the API
 * @returns {Promise<Gateway[]>}
 */
async function getGateways() {
  const {data} = await api.get('/gateways')
  return data
}

/**
 * Hook for fetching the gateways from the API
 * @returns {GatewayHookInterface}
 */
export default function useGateways(): GatewayHookInterface {
  const {data, isLoading} = useQuery('gateways', getGateways, {
    select: transformResponse,
  })
  const gateways = data || null;
  return {gateways, isLoading}
}
