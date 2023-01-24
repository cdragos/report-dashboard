export interface Gateway {
  gatewayId: string
  name: string
}

export interface GatewayHookInterface {
  gateways: Gateway[] | null
  isLoading: boolean
}

