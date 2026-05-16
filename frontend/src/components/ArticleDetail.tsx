import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getArticleBySlug } from '../services/articleService';
import ReactMarkdown from 'react-markdown';

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { data: res, isLoading, isError } = useQuery({
    queryKey: ['article', slug],
    queryFn: () => getArticleBySlug(slug!),
    enabled: !!slug,
  });

  const article = res?.data;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 space-y-4">
        <div className="w-12 h-12 border-4 border-black border-t-emerald-500 rounded-full animate-spin"></div>
        <p className="font-black text-gray-400 uppercase tracking-widest text-xs">Məqalə yüklənir...</p>
      </div>
    );
  }

  if (isError || !article) {
    return <div className="p-20 text-center font-bold text-red-500">Məqalə tapılmadı.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-24 px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <button 
        onClick={() => navigate(-1)}
        className="group flex items-center gap-2 text-gray-400 hover:text-black text-[10px] font-black uppercase tracking-[2px] transition-all mb-12"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span> GERİ QAYIT
      </button>

      <header className="mb-12 border-b border-gray-100 pb-8">
        <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-full">
          {article.category}
        </span>
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter mt-6 text-gray-950">
          {article.title}
        </h1>
      </header>

      {/* Dinamik Teq Dizaynı */}
      <div className="space-y-6 text-xl text-gray-600 leading-relaxed font-medium">
        <ReactMarkdown
          components={{
            // Əgər mətndə təkrar h1 gələrsə, onu normal başlığa salır
            h1: ({ children }) => <h2 className="text-3xl font-black text-gray-900 tracking-tight mt-10 mb-4">{children}</h2>,
            h2: ({ children }) => <h2 className="text-3xl font-black text-gray-900 tracking-tight mt-10 mb-4">{children}</h2>,
            h3: ({ children }) => <h3 className="text-2xl font-black text-gray-900 tracking-tight mt-8 mb-3">{children}</h3>,
            p: ({ children }) => <p className="mb-6">{children}</p>,
            // Qalın yazılan hissələri və önəmli terminləri vurğulayır
            strong: ({ children }) => (
              <strong className="font-black text-gray-950 bg-emerald-50/70 px-1.5 py-0.5 rounded-md decoration-emerald-300">
                {children}
              </strong>
            ),
            // Siyahı (ul/li) strukturunu gözəlləşdirir
            ul: ({ children }) => <ul className="list-none pl-2 space-y-3 my-6">{children}</ul>,
            li: ({ children }) => (
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 mt-1.5 text-xs">●</span>
                <span className="flex-1">{children}</span>
              </li>
            ),
          }}
        >
          {article.body}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default ArticleDetail;