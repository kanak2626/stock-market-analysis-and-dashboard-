import axios from "axios";

const ALPHA_KEY = "VE0EAH2AOJSF5NID";
const TWELVE_KEY = "c0fa217655574fbbb71f37cc467372ab";
const FINNHUB_KEY = "d9hltg9r01qjmfd9guv0d9hltg9r01qjmfd9guvg";

const twelveAPI = axios.create({
  baseURL: "https://api.twelvedata.com",
});

const alphaAPI = axios.create({
  baseURL: "https://www.alphavantage.co",
});

const finnhubAPI = axios.create({
  baseURL: "https://finnhub.io/api/v1",
});

// ==========================
// STOCK QUOTE
// ==========================

export const getStockQuote = async (symbol) => {
  try {
    const response = await twelveAPI.get("/quote", {
      params: {
        symbol,
        apikey: TWELVE_KEY,
      },
    });

    if (response.data.status === "error") return null;

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// ==========================
// HISTORY
// ==========================

export const getStockHistory = async (symbol) => {
  try {
    const response = await alphaAPI.get("/query", {
      params: {
        function: "TIME_SERIES_DAILY",
        symbol,
        outputsize: "compact",
        apikey: ALPHA_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

// ==========================
// LIVE QUOTE
// ==========================

export const getLiveQuote = async (symbol) => {
  try {
    const response = await finnhubAPI.get("/quote", {
      params: {
        symbol,
        token: FINNHUB_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// ==========================
// COMPANY PROFILE
// ==========================

export const getCompanyProfile = async (symbol) => {
  try {
    const response = await finnhubAPI.get("/stock/profile2", {
      params: {
        symbol,
        token: FINNHUB_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

// ==========================
// NEWS
// ==========================

export const getMarketNews = async () => {
  try {
    const response = await finnhubAPI.get("/news", {
      params: {
        category: "general",
        token: FINNHUB_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// ==========================
// CHART DATA
// ==========================

export const getMarketChartData = async () => {
  const symbols = [
    "AAPL",
    "MSFT",
    "GOOGL",
    "AMZN",
    "META",
  ];

  try {
    const result = await Promise.all(
      symbols.map(async (symbol) => {
        const quote = await getLiveQuote(symbol);

        return {
          symbol,
          open: Number(quote.o),
          close: Number(quote.c),
          high: Number(quote.h),
          low: Number(quote.l),
        };
      })
    );

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// ==========================
// SEARCH
// ==========================

export const searchStock = async (symbol) => {
  return await getStockQuote(symbol);
};

// ==========================
// DASHBOARD
// ==========================

export const getDashboardData = async (symbol) => {
  const quote = await getStockQuote(symbol);

  const history = await getStockHistory(symbol);

  const company = await getCompanyProfile(symbol);

  return {
    quote,
    history,
    company,
  };
};
