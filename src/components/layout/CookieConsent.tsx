import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAgreed, setHasAgreed] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('shit_journal_consent');
    if (!consent) {
      setIsVisible(true);
      // 🔒 强制锁死底层页面的滚动，逼迫用户必须处理这个弹窗
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const handleAccept = () => {
    if (!hasAgreed) return;
    localStorage.setItem('shit_journal_consent', 'true');
    setIsVisible(false);
    // 🔓 解除滚动锁定
    document.body.style.overflow = 'unset';
  };

  if (!isVisible) return null;

  return (
    // 🌑 全屏遮罩 + 深度模糊，彻底阻断背景交互
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-charcoal/90 backdrop-blur-md p-4">
      
      {/* 📜 核心法律文书框 */}
      <div className="bg-white max-w-3xl w-full border-t-8 border-accent-gold shadow-2xl p-8 md:p-12 relative">
        
        {/* 压迫感标题 */}
        <div className="text-center mb-8">
          <span className="text-5xl block mb-4">⚖️</span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-charcoal mb-2">
            USER NOTICE / 用户须知
          </h2>
          <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">
            Please read carefully before proceeding / 使用本网站前请仔细阅读
          </p>
        </div>

        {/* 严肃的免责条款正文 */}
        <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed mb-8 max-h-[40vh] overflow-y-auto pr-4 border-b border-gray-100 pb-6">
          <p className="font-bold text-charcoal mb-2">欢迎访问 S.H.I.T. Journal。</p>
          <p>
            本平台为<strong>非营利性学术与文化讨论社区</strong>。为保障平台的正常运行、防范恶意攻击及履行必要的合规义务，本网站需使用 Cookie 及同类技术来维持登录状态及安全防护机制。
          </p>
          <p>
            鉴于本平台内容的特殊性，您在进入本网站前，必须明确知悉并同意：<br/>
            1. 本网站内容仅代表作者个人观点，<strong>不代表平台立场</strong>。<br/>
            2. 您应当遵守适用法律法规，平台有权根据规则对违规内容采取清理、折叠或移交等措施。<br/>
            3. 您在使用本平台服务时产生的一切数据交互，均受本站法律条款约束。
          </p>
          <p className="text-red-600 font-bold mt-4">
            如您拒绝接受本声明，请立即关闭浏览器标签页并停止访问本站。
          </p>
        </div>

        {/* ⚠️ 强制交互区 */}
        <div className="flex flex-col gap-6">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="pt-0.5">
              <input 
                type="checkbox" 
                checked={hasAgreed}
                onChange={(e) => setHasAgreed(e.target.checked)}
                className="w-5 h-5 accent-accent-gold cursor-pointer"
              />
            </div>
            <div className="text-sm text-charcoal font-bold group-hover:text-accent-gold transition-colors select-none">
              我已年满 18 周岁，并已仔细阅读且同意遵守本平台的 
              <Link to="/terms" target="_blank" className="text-accent-gold underline mx-1">《用户协议》</Link> 
              与 
              <Link to="/privacy" target="_blank" className="text-accent-gold underline mx-1">《隐私政策》</Link>。
              <span className="block text-xs text-gray-400 font-normal mt-1">
                I am over 18 and agree to the Terms of Service and Privacy Policy.
              </span>
            </div>
          </label>

          <button
            onClick={handleAccept}
            disabled={!hasAgreed}
            className={`w-full py-4 text-sm font-bold uppercase tracking-widest transition-all ${
              hasAgreed 
                ? 'bg-accent-gold text-white hover:bg-charcoal shadow-lg hover:shadow-xl' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {hasAgreed ? 'ENTER S.H.I.T. JOURNAL / 同意并进入' : '请先勾选同意声明'}
          </button>
        </div>

      </div>
    </div>
  );
};