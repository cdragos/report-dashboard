import moment from 'moment';
import api from 'api';
import { useQuery } from 'react-query';
import { Report, ReportHookInterface } from 'types/report';

/**
 * Base interface for the params that are sent to the hook and API
 */
interface ReportParams {
  projectId: string | null
  gatewayId: string | null
}

/**
 * Interface for the params that are sent to the hook
 */
interface ReportHookParams extends ReportParams {
  startDate: Date | null
  endDate: Date | null
}

/**
 * Interface for the params that are sent to the API
 */
interface ReportGetParams extends ReportParams {
  startDate: string | null
  endDate: string | null
}

/**
 * Transforms the response from the API into a more usable format
 * @param {Object} results - The results from the API
 * @returns {Report[]} - An array of reports
 */
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

/**
 * Fetches the report from the API
 * @param params
 * @returns {Promise<Report[]>}
 */
async function getReport({
  projectId,
  gatewayId,
  startDate,
  endDate,
}: ReportGetParams) {
  const params: any = {}
  if (projectId) {
    params.projectId = projectId
  }
  if (gatewayId) {
    params.gatewayId = gatewayId
  }
  if (startDate) {
    params.from = startDate
  }
  if (endDate) {
    params.to = endDate
  }
  const { data } = await api.post('/report', params)
  return data
}

/**
 * Custom hook to fetch the report from the API
 * @param projectId - The project ID to filter by
 * @param gatewayId - The gateway ID to filter by
 * @param startDate - The start date to filter by
 * @param endDate - The end date to filter by
 * @returns {ReportHookInterface} - The report and loading state
 */
export default function useReport({
  projectId,
  gatewayId,
  startDate,
  endDate,
}: ReportHookParams): ReportHookInterface {
  const startDateFormatted = startDate ? moment(startDate).format('YYYY-MM-DD') : null
  const endDateFormatted = endDate ? moment(endDate).format('YYYY-MM-DD') : null
  const params = { projectId, gatewayId, startDate: startDateFormatted, endDate: endDateFormatted, }

  const queryKey = ['reports', projectId, gatewayId, startDateFormatted, endDateFormatted]
  const { data, isLoading } = useQuery(queryKey, () => getReport(params), {
    select: transformResponse,
  })
  const reports = data || null;
  return { reports, isLoading }
}
