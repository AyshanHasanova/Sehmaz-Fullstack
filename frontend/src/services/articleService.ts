import api from './api'; // Öz yaratdığın api faylını import etdik
import type { Article } from '../types/index';

export const getAllArticles = async () => {
  // api-nin daxilində zatən /api var, bura sadəcə /articles qalır
  const response = await api.get<Article[]>('/articles'); 
  return response;
};

export const getArticleBySlug = async (slug: string) => {
  const response = await api.get<Article>(`/articles/${slug}`);
  return response;
};