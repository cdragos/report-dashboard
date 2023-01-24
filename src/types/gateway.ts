export interface Gateway {
  gatewayId: number
  name: string
}

export interface GatewayHookInterface {
  gateways: Gateway[] | null
  isLoading: boolean
}

