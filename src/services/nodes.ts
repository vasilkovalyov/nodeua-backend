import nodes from "../static-data/nodes.json";
import nodesDescription from "../static-data/nodes-descriptions.json";
import ApiError from "./api-error";
import { AuthMessages } from "../constants/response-messages";

export function getAllNodesService() {
  const filters = {
    active: nodes.filter((n) => n.is_active && !n.is_soldout && !n.is_tba),
    soldout: nodes.filter((n) => n.is_soldout),
    tba: nodes.filter((n) => n.is_tba)
  };

  return filters;
}

export function getNodesByIdArrayService(ids: string[]) {
  const objIds = {};
  for (const key of ids) {
    objIds[key] = objIds;
  }

  const nodeResponse = nodes.filter((node) => {
    if (objIds[node._id]) {
      return node;
    }
    return null;
  });

  return nodeResponse;
}

export function getNodeService(id: string) {
  const nodeResponse = nodes.filter((node) => node._id === id);

  if (!nodeResponse.length) {
    throw ApiError.BadRequestError(AuthMessages.nodeInfoNotExist);
  }

  const nodeResponseDescription = nodesDescription.filter((node) => node._id === id);

  return {
    ...nodeResponse[0],
    description: nodeResponseDescription[0]
  };
}
