export interface Gateway {
  gatewayId: number
  name: string
}

export interface GatewayContextInterface {
  gateways: Gateway | undefined | null
  isLoading: boolean
}

