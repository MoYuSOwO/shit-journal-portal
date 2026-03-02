import React from 'react';
import { Link } from 'react-router-dom';

export const ZoneSystemArticle: React.FC = () => (
  <div className="max-w-3xl mx-auto px-4 lg:px-8 py-12">
    <Link
      to="/news"
      className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-accent-gold transition-colors mb-8 inline-block"
    >
      &larr; Back to News / 返回新闻
    </Link>

    <article>
      <div className="mb-8">
        <span className="text-[10px] font-bold text-science-red uppercase tracking-widest">New Feature / 新功能</span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold mt-2 mb-2">
          构石四域上线：旱厕 → 化粪池 → 构石 → 沉淀区
        </h1>
        <p className="text-sm text-gray-400 italic mb-1">Zone System Live: Latrine → Septic Tank → The Stone → Sediment</p>
        <p className="text-sm text-gray-400">2026-03-02 · S.H.I.T Editorial</p>
      </div>

      <div className="border-l-4 border-accent-gold pl-6 mb-8">
        <p className="font-serif text-lg text-gray-700 leading-relaxed italic">
          所有新稿件进入「旱厕」盲审，集齐30个评分后根据分数自动晋升至「化粪池」或沉入「沉淀区」。化粪池中的精品可继续冲击「构石」殿堂——一旦晋升，永不降级。
        </p>
      </div>

      <div className="prose prose-charcoal max-w-none space-y-6">
        <div>
          <h2 className="text-xl font-serif font-bold mb-3">四域概览</h2>
          <p className="text-sm text-charcoal leading-relaxed mb-4">
            S.H.I.T Journal 全新推出四域评审系统，让社区共同决定每篇稿件的命运。所有新投稿自动进入「旱厕」，经过社区嗅探兽的公开盲审，根据评分自动流转至不同区域。
          </p>
        </div>

        <div className="space-y-5">
          <div className="border-l-2 border-gray-200 pl-5">
            <h3 className="text-base font-serif font-bold mb-2">
              <span className="text-lg mr-2">🚽</span>旱厕 / Latrine
            </h3>
            <p className="text-sm text-gray-600">
              所有新稿件的起点。在这里，稿件接受社区匿名评分。排序每5分钟随机洗牌，确保每篇论文都有公平的曝光机会，不因提交时间先后而被埋没。
            </p>
          </div>

          <div className="border-l-2 border-accent-gold pl-5">
            <h3 className="text-base font-serif font-bold mb-2">
              <span className="text-lg mr-2">🧱</span>化粪池 / Septic Tank
            </h3>
            <p className="text-sm text-gray-600">
              集齐30个评分且平均分≥3.8的稿件自动晋升至化粪池。这里是经过初步社区筛选的优质内容池。如果后续评分人数超过100人但均分跌破3.8，将被降入沉淀区。
            </p>
          </div>

          <div className="border-l-2 border-science-red pl-5">
            <h3 className="text-base font-serif font-bold mb-2">
              <span className="text-lg mr-2">🪨</span>构石 / The Stone
            </h3>
            <p className="text-sm text-gray-600">
              化粪池中评分人数超过100且平均分≥4.5的作品自动晋升至「构石」殿堂。一旦晋升，永不降级——这是社区对学术精品的最高认可。
            </p>
          </div>

          <div className="border-l-2 border-gray-400 pl-5">
            <h3 className="text-base font-serif font-bold mb-2">
              <span className="text-lg mr-2">🕳️</span>沉淀区 / Sediment
            </h3>
            <p className="text-sm text-gray-600">
              集齐30个评分但平均分不足3.8的稿件沉入沉淀区。这些稿件仍可被阅读和评分，但不再出现在主要浏览列表中。
            </p>
          </div>
        </div>

        <div className="bg-[#FFF8E1] border border-accent-gold/30 p-5 mt-6">
          <h2 className="text-base font-serif font-bold mb-2">公平排序机制</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            旱厕中的稿件采用「时间梯度+随机洗牌」排序：同一小时内提交的稿件视为同一梯度，梯度内每5分钟随机重排。这意味着新稿件不会因为提交晚几分钟就被挤到后面，每篇论文都能获得充分的社区审阅机会。
          </p>
        </div>

        <div>
          <h2 className="text-xl font-serif font-bold mb-3">评分权重</h2>
          <p className="text-sm text-charcoal leading-relaxed">
            稿件展示的分数为贝叶斯加权分（Bayesian Weighted Score），而非简单算术平均。系统引入全局均值作为先验，在评分人数较少时向均值收敛，避免少量极端评分导致排名失真。随着评分人数增加，加权分逐渐趋近真实平均分。
          </p>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-500 mb-4">
          去旱厕看看有什么新鲜的
        </p>
        <Link
          to="/preprints"
          className="inline-block px-10 py-4 bg-accent-gold text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#B18E26] transition-colors shadow-lg"
        >
          Browse Preprints / 浏览旱厕
        </Link>
      </div>
    </article>
  </div>
);
