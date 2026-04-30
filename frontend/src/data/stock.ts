

export interface Stock {
    symbol: string;
    name: string;
    price: string;
    change: string;
    isPositive: boolean;
    description: string;
    status: "Aşağı" | "Yüksək" | "Stabil";
    sector: string; // Şəkildəki "Texnologiya", "Avtomobil" və s. üçün
  }
  
  export const stockData: Record<string, Stock> = {
    AAPL: {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: "228.42",
      change: "+1.93%",
      isPositive: true,
      description: "Apple iPhone, Mac və Apple Watch kimi məhsullar düzəldən şirkətdir. Sadə dillə desək — cibinizdəki telefonu və qulağınızdakı qulaqlığı bir çox insan onlardan alır.",
      status: "Aşağı",
      sector: "Texnologiya",
    },
    TSLA: {
      symbol: "TSLA",
      name: "Tesla, Inc.",
      price: "412.07",
      change: "-3.38%",
      isPositive: false,
      description: "Tesla elektrikli işləyən maşınlar düzəldir. Benzin əvəzinə rozetkadan enerji alır — yəni telefon kimi şarj olunur, sadəcə nəhəng versiyada.",
      status: "Yüksək",
      sector: "Avtomobil",
    },
    MSFT: {
      symbol: "MSFT",
      name: "Microsoft Corp.",
      price: "502.18",
      change: "+0.78%",
      isPositive: true,
      description: "Dünyanın ən böyük proqram təminatı şirkətidir. Windows əməliyyat sistemi və Office proqramları ilə tanınır.",
      status: "Stabil",
      sector: "Texnologiya",
    },
    NVDA: {
      symbol: "NVDA",
      name: "NVIDIA Corp.",
      price: "142.83",
      change: "+2.82%",
      isPositive: true,
      description: "Oyun dünyası və süni intellekt üçün ən güclü qrafik çipləri (videokartları) istehsal edən dünya lideridir.",
      status: "Yüksək",
      sector: "Yarımkeçirici",
    },
    GOOGL: {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      price: "178.55",
      change: "+1.91%",
      isPositive: true,
      description: "Google axtarış motoru, YouTube və Android sisteminin sahibi olan texnologiya nəhəngidir.",
      status: "Aşağı",
      sector: "Texnologiya",
    },
    AMZN: {
      symbol: "AMZN",
      name: "Amazon.com, Inc.",
      price: "224.91",
      change: "+1.54%",
      isPositive: true,
      description: "Amazon dünyanın ən böyük onlayn alış-veriş platformasıdır. İstədiyiniz hər şeyi bir kliklə qapınıza gətirən nəhəng bir loqistika və bulud texnologiyaları mərkəzidir.",
      status: "Stabil",
      sector: "Onlayn ticarət",
    },
    META: {
      symbol: "META",
      name: "Meta Platforms",
      price: "612.40",
      change: "+1.19%",
      isPositive: true,
      description: "Facebook, Instagram və WhatsApp-ın sahibi olan şirkətdir. İnsanları bir-birinə bağlayan sosial media dünyasının ən böyük qurucusudur.",
      status: "Yüksək",
      sector: "Sosial şəbəkə",
    },
    NFLX: {
      symbol: "NFLX",
      name: "Netflix, Inc.",
      price: "718.30",
      change: "-1.62%",
      isPositive: false,
      description: "Dünyanın ən populyar film və serial platformasıdır. Televiziya anlayışını dəyişərək hər şeyi internet üzərindən izləməmizi təmin edir.",
      status: "Yüksək",
      sector: "Əyləncə",
    },
  };
  
  export const stockList: Stock[] = Object.values(stockData);