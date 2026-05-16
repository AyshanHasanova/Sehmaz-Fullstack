import axios from 'axios';
import type { Article } from '../types/index'; // 'type' açar sözünü əlavə etmək bəzən xətanı silir

const API_URL = 'http://localhost:3000/api/articles';

export const getAllArticles = async () => {
  return await axios.get<Article[]>(API_URL);
};

export const getArticleBySlug = async (slug: string) => {
  return await axios.get<Article>(`${API_URL}/${slug}`);
};