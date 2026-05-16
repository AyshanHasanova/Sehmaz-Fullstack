// src/types/index.ts

export interface Article {
    _id: string;
    title: string;
    slug: string;
    category: 'Əsaslar' | 'Texniki analiz' | 'Risk idarəsi' | 'Termin lüğəti';
    body: string;
    order: number;
    createdAt: string;
}

// Gələcəkdə lazım ola biləcək ümumi API cavab tipi
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}