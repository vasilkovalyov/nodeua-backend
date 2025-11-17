import { NodeType } from "../../models/node/node-model-type";
import { getDaysCountBetweenDates, getMonthsCountBetweenDates } from "../../utils/dates";

export function getNodeServicesFormatedMaxDuration(nodes: NodeType[]): NodeType[] {
  const now = new Date();

  const res: NodeType[] = nodes.map((node) => {
    const monthCountLeft = getMonthsCountBetweenDates(now, new Date(node.expiration_date));
    const nodeMaxDuration: number = node.max_duration_months;
    const maxDuarationToDate: number = monthCountLeft > nodeMaxDuration ? nodeMaxDuration : monthCountLeft;

    return {
      ...node,
      max_duration_months: maxDuarationToDate,
      max_duration_days: getDaysCountBetweenDates(new Date(), new Date(node.expiration_date))
    };
  });

  return res;
}
