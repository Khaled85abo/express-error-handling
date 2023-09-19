import { Request, Response } from "express";
import axios from "axios";
import config from "../config/config";

const elasticSearch = async (req: Request, res: Response) => {
  try {
    // Forward the query to the Elasticsearch endpoint
    const esResponse = await axios.post(
      `${config.elasticsearch.url}/_search`,
      req.body
    );
    return res.json(esResponse.data);
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return res.status(error.response.status).json(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      return res.status(500).json({ error: "No response from Elasticsearch." });
    } else {
      // Something happened in setting up the request that triggered an Error
      return res.status(500).json({ error: "Failed to process the request." });
    }
  }
};

const elasticMapping = async (req: Request, res: Response) => {
  try {
    // Forward the query to the Elasticsearch endpoint
    const esResponse = await axios.get(`${config.elasticsearch.url}/_mapping`);
    return res.json(esResponse.data);
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return res.status(error.response.status).json(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      return res.status(500).json({ error: "No response from Elasticsearch." });
    } else {
      // Something happened in setting up the request that triggered an Error
      return res.status(500).json({ error: "Failed to process the request." });
    }
  }
};

const healthcheck = (req: Request, res: Response) => {
  res.json({ message: "Elastic route is working" });
};
export default { elasticSearch, elasticMapping, healthcheck };
