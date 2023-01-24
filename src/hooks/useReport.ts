import api from 'api';
import { useQuery } from 'react-query';
import { Report, ReportHookInterface } from 'types/report';

interface ReportParams {
  projectId: number | null
  gatewayId: number | null
}

function transformResponse(results: { data: Array<object> }): Report[] {
  return results.data.map((result: any) => ({
      paymentId: result.paymentId,
      amount: result.amount,
      projectId: result.projectId,
      gatewayId: result.gatewayId,
      modified: result.modified,
      created: result.created,
    }))
}

async function getReport({
  projectId,
  gatewayId,
}: ReportParams) {
  const params = { projectId, gatewayId }
  const { data } = await api.post('/report', params)
  return data
}

export default function useReport({
  projectId,
  gatewayId,
}: ReportParams): ReportHookInterface {
  const params = { projectId, gatewayId }
  const { data, isLoading } = useQuery(`reports-${projectId}-${gatewayId}`, () => getReport(params), {
    select: transformResponse,
  })
  const reports = data || null;
  return { reports, isLoading }
}
