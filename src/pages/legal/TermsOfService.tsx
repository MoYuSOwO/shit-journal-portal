import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const TermsOfService: React.FC = () => {
  // 每次进入页面自动滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        
        {/* 返回按钮 */}
        <Link to="/" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-accent-gold mb-8 inline-block">
          ← Back to Home
        </Link>

        {/* 文书主体 */}
        <div className="bg-white border border-gray-300 p-8 md:p-16 shadow-sm">
          
          {/* 标头区域 */}
          <div className="border-b-2 border-charcoal pb-8 mb-8 text-center">
            <h1 className="text-3xl font-serif font-bold text-charcoal mb-4">SHIT Journal 用户协议</h1>
            <div className="flex justify-center gap-6 text-sm text-gray-500 font-mono">
              <span>版本号: v1.0</span>
              <span>生效日期: 2026/03/06</span>
            </div>
          </div>

          {/* 正文区域 */}
          <div className="prose prose-sm md:prose-base max-w-none text-charcoal leading-loose">
            
            <p className="font-bold mb-8">引言</p>
            <p className="mb-8">
              欢迎您使用 SHIT Journal 及相关服务。SHIT Journal 为非营利性学术期刊网站，并附带评论区、回复区等受管理的讨论功能。请您在注册、登录、浏览、投稿、评论、评分、上传材料、举报、申诉或以其他任何方式使用本平台前，仔细阅读并充分理解本协议。您一经使用本平台，即视为已经阅读、理解并同意受本协议约束；如您不同意本协议任何内容，请立即停止使用本平台。
            </p>

            <hr className="my-8 border-gray-200" />

            {/* 第一条 */}
            <h2 className="text-xl font-bold mt-10 mb-6 text-charcoal">1. 定义与协议范围</h2>
            <div className="pl-4 space-y-4 text-gray-700">
              <p>
                <span className="font-bold text-charcoal">1.1</span> 本协议中的“本平台”或“SHIT Journal”，系指由 SHIT Journal 运营方提供的学术期刊网站及相关网页、系统、账户服务、投稿系统、评论区、审核机制、公告页面及其后续功能。
              </p>
              <p>
                <span className="font-bold text-charcoal">1.2</span> 本协议中的“用户”，系指注册、登录、浏览、投稿、评论、评分、举报、下载、引用或以其他方式使用本平台服务的任何个人。
              </p>
              <p>
                <span className="font-bold text-charcoal">1.3</span> 本协议中的“内容”，包括但不限于稿件、摘要、图表、附件、数据说明、评论、回复、评分、头像、昵称、个人简介、站内消息及其他通过本平台提交、发布、上传、存储、展示或传输的一切信息。
              </p>
              <p>
                <span className="font-bold text-charcoal">1.4</span> 本协议与本平台已经发布或将来发布的《投稿办法》《初审标准》《AI 使用声明》、分区规则、评论区规则、站内公告、页面说明、操作提示等，共同构成您与本平台之间完整的服务规则。
              </p>
              <p>
                <span className="font-bold text-charcoal">1.5</span> 如本协议与专项规则不一致，就对应事项以专项规则为准；专项规则未规定的，适用本协议。
              </p>
              <p>
                <span className="font-bold text-charcoal">1.6</span> 关于个人信息处理、账号注销、日志记录、Cookie 或其他隐私事项，另行适用本平台独立发布的《隐私政策》。
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* 第二条 */}
            <h2 className="text-xl font-bold mt-10 mb-6 text-charcoal">2. 平台性质与服务说明</h2>
            <div className="pl-4 space-y-4 text-gray-700">
              <p><span className="font-bold text-charcoal">2.1</span> 本平台系非营利性学术项目，不以平台本身作为商业盈利工具。</p>
              <p><span className="font-bold text-charcoal">2.2</span> 本平台原则上不会通过平台经营获取商业利润；如因服务器、域名、存储、安全、技术维护、审核组织及其他基础运营事项产生必要费用，本平台可在合理范围内筹措维持运营所需的基本费用，但应尽量保持用途说明与收支信息透明。</p>
              <p><span className="font-bold text-charcoal">2.3</span> 本平台当前服务器及主要技术基础设施位于爱尔兰。您理解并同意，为实现本平台服务之必要，相关服务访问、数据传输、存储、备份与技术维护可能在服务器所在地环境中完成。</p>
              <p>
                <span className="font-bold text-charcoal">2.4</span> 本平台提供的服务包括但不限于：<br/>
                （1）账号注册、登录与基本资料管理；<br/>
                （2）稿件提交、退修、初审、发表、下架、归档；<br/>
                （3）文章展示、评论、回复、评分、举报；<br/>
                （4）站内通知、申诉、争议处理、社区治理；<br/>
                （5）其他与学术交流、内容发表和讨论秩序维护有关的服务。
              </p>
              <p><span className="font-bold text-charcoal">2.5</span> 评论区、回复区及其他互动空间属于受管理的讨论区，不构成完全开放、无限制或无治理义务的公共论坛。本平台对相关内容保留审核、编辑、折叠、删除、限制展示、关闭评论、限制互动及纪律处分的权利。</p>
              <p><span className="font-bold text-charcoal">2.6</span> 本平台有权基于技术、运营、风控、合规或学术治理需要，增加、减少、调整、暂停、下线或替换部分服务或功能。</p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* 第三条 */}
            <h2 className="text-xl font-bold mt-10 mb-6 text-charcoal">3. 用户资格与账号规则</h2>
            <div className="pl-4 space-y-4 text-gray-700">
              <p><span className="font-bold text-charcoal">3.1</span> 本平台主要面向具有完全民事行为能力的用户。未满 18 周岁的用户，应在监护人同意、指导或陪同下阅读并使用本平台。</p>
              <p><span className="font-bold text-charcoal">3.2</span> 您注册账号时，应按页面要求提供真实、准确、完整、合法且持续有效的注册信息，并及时更新。</p>
              <p><span className="font-bold text-charcoal">3.3</span> 您不得冒用他人姓名、机构、学术身份、头像、昵称、笔名或其他足以引起混淆的信息注册、投稿、评论或参与互动，除非这些信息为完全杜撰的。</p>
              <p><span className="font-bold text-charcoal">3.4</span> 账号使用权仅属于初始申请注册人本人。未经本平台书面许可，您不得赠与、出借、出租、出售、转让、共享或以其他方式允许第三人使用您的账号。</p>
              <p><span className="font-bold text-charcoal">3.5</span> 您应妥善保管账号、邮箱及密码，并对通过该账号发生的一切行为承担责任。</p>
              <p><span className="font-bold text-charcoal">3.6</span> 如您发现账号存在异常登录、密码泄露、未授权使用或其他安全问题，应立即通知本平台。</p>
              <p><span className="font-bold text-charcoal">3.7</span> 本平台有权基于安全、合规、风控或争议处理需要，要求您完成补充说明、信息核验或必要验证。</p>
              <p><span className="font-bold text-charcoal">3.8</span> 如本平台有合理理由认为您的账号存在冒名、滥用、批量注册、违规操作、安全风险或其他不当情形，本平台有权限制、冻结、暂停、终止或收回相关账号及功能。</p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* 第四条 */}
            <h2 className="text-xl font-bold mt-10 mb-6 text-charcoal">4. 用户行为规范</h2>
            <div className="pl-4 space-y-4 text-gray-700">
              <p><span className="font-bold text-charcoal">4.1</span> 您在使用本平台时，应遵守适用法律法规、公序良俗、本协议以及本平台全部规则。您不得利用本平台发布、上传、传播、评论、引导、索引、链接或以其他方式提供下列内容，亦不得借助本平台实施下列行为：</p>
              <ul className="list-none space-y-2 text-sm italic">
                <li>（1）违法信息、教唆违法、规避监管、可造成现实人身伤害或负面社会影响的信息；</li>
                <li>（2）管制类药品制备、武器制备、可造成人体伤害的现实操作方法、危险模仿性内容；</li>
                <li>（3）色情露骨内容、未成年人相关不当内容、任何非学术性性刺激内容；</li>
                <li>（4）仇恨、歧视、骚扰、威胁、辱骂、引战、羞辱、恶意挑衅、恶意挂人；</li>
                <li>（5）人肉搜索、隐私泄露、未经去识别化处理的个人资料、未经许可公开他人截图或可识别信息、未成年人个人信息；</li>
                <li>（6）针对具体自然人的恶意指控、羞辱、诽谤、曝光、现实世界无依据指责；</li>
                <li>（7）违反投稿管理文件的不端行为；</li>
                <li>（8）广告、引流、代写代投、兜售平台相关事物、论文买卖、非法交易、刷屏、灌水、重复发布；</li>
                <li>（9）病毒、恶意代码、外挂、自动发帖工具、发帖机、攻击行为、探测漏洞、未授权访问、绕过安全措施；</li>
                <li>（10）涉政、恶意政治性内容、时政评判、极端主义、宗教主义、军事学、伪/伪造医学、伪/伪造心理学、伪/伪造社会学、伪法学、漏洞操控、恶意侵权解读等偏离本平台定位且具有现实风险的内容；</li>
                <li>（11）将现在进行时或近期社会事件直接作为论文内容进行创作、包装、戏仿或传播；</li>
                <li>（12）其他违反法律法规、平台规则、知识产权、人格权、名誉权、隐私权或平台定位的内容。</li>
              </ul>
              <p><span className="font-bold text-charcoal">4.2</span> 您在公开区域发布任何内容前，应自行判断是否愿意公开。凡您主动公开的内容，均可能被其他用户阅读、评论、引用或举报。</p>
              <p><span className="font-bold text-charcoal">4.3</span> 您应对自己发布、上传、提交、评论或传播的全部内容独立承担个人责任及法律义务。因您的行为导致任何第三方索赔、投诉、争议、行政调查、处罚或诉讼的，由您自行承担责任；给本平台造成损失的，您应负责赔偿。</p>
              <p><span className="font-bold text-charcoal">4.4</span> 本平台有权依据平台规则、现有技术手段及人工判断，对涉嫌违规的内容和行为进行识别、审核、限制、折叠、删除、拒绝发表、下架、封禁或采取其他必要措施。</p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* 第五条 */}
            <h2 className="text-xl font-bold mt-10 mb-6 text-charcoal">5. 投稿规则与作者义务 <span className="text-sm font-normal text-gray-400 italic">详见《管理文件》</span></h2>
            <div className="pl-4 space-y-4 text-gray-700">
              <p><span className="font-bold text-charcoal">5.1 一般投稿要求：</span></p>
              <ul className="list-none space-y-2">
                <li>（1）您投稿前，应阅读并遵守本平台现行的《投稿办法》、《管理规则》等文件，于投稿前同意区可见。</li>
                <li>（2）稿件应以平台允许的格式提交，并满足可打开、可阅读、非空白、非损坏、内容清晰可辨认的基本要求。</li>
                <li>（3）您提交稿件时，应保证对稿件及其中所含文字、图片、图表、数据、附件、代码、问卷、表格或其他材料享有合法权利，或已取得必要授权。</li>
                <li>（4）稿件中除整活类目外的作者信息、研究对象、样本来源、材料来源、数据来源、图表来源、引用来源、研究过程、推导路径及其他重要事实，应真实、准确、完整，不得隐瞒任何足以影响审核判断的重要信息。</li>
                <li>（5）除整活类目外凡引用他人成果、数据、图片、图表、观点或其他受保护内容的，均应按照平台要求进行清晰、可追溯的标注，并尽量使用标准 APA7 规范。</li>
                <li>（6）本平台对任何投稿均无必须收录、必须发表、必须持续展示的义务。稿件进入本平台后，即视为您同意本平台依规则对其进行审核、退修、拒稿、改投建议、发表、归档、限制访问或下架处理。</li>
              </ul>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* 第六条 */}
            <h2 className="text-xl font-bold mt-10 mb-6 text-charcoal">6. 审核机制 <span className="text-sm font-normal text-gray-400 italic">详见《管理文件》</span></h2>
            <div className="pl-4 space-y-4 text-gray-700">
              <p><span className="font-bold text-charcoal">6.1</span> 本平台初审的主要目的，仅限于：（1）合规；（2）可读；（3）反滥用。</p>
              <p><span className="font-bold text-charcoal">6.2</span> 初审不对观点正确与否、学术价值高低、结论真伪、研究水平优劣作最终裁判。对硬核区稿件，初审仅审查其是否达到最低“问题—方法—证据”门槛及是否具备可讨论性。</p>
              <p><span className="font-bold text-charcoal">6.3</span> 本平台对稿件分区、初审结论、退修要求、是否发表、是否继续展示、是否限制访问或是否处罚，保留依规则作出独立判断的权利。</p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* 第七条 */}
            <h2 className="text-xl font-bold mt-10 mb-6 text-charcoal">7. 评论区与讨论区规则</h2>
            <div className="pl-4 space-y-4 text-gray-700">
              <p><span className="font-bold text-charcoal">7.1</span> 评论区、回复区及其他互动功能，是本平台附随的受管理讨论空间，不属于无条件开放论坛。</p>
              <p><span className="font-bold text-charcoal">7.2</span> 您在评论区发布的内容应围绕文章、议题或讨论主题进行，不得灌水、挑衅、刷屏、辱骂、挂人、泄露隐私或恶意破坏讨论秩序。</p>
              <p><span className="font-bold text-charcoal">7.3</span> 本平台有权对评论、回复、评分及其他互动信息进行审核、折叠、隐藏、删除、关闭评论、限制互动或处罚账号。</p>
              <p><span className="font-bold text-charcoal">7.4</span> 您理解并同意，评论区存在学术讨论、质疑、反驳和争论，但该等争论必须在规则范围内进行，不得突破人格尊严、隐私权、名誉权及平台红线。</p>
              <p><span className="font-bold text-charcoal">7.5</span> 任何用户发现平台内容涉嫌侵权、诽谤、隐私泄露、违法违规或其他严重问题的，有权通过本平台提供的举报或联系渠道提出投诉。</p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* 第八条 */}
            <h2 className="text-xl font-bold mt-10 mb-6 text-charcoal">8. 知识产权与内容授权</h2>
            <div className="pl-4 space-y-4 text-gray-700">
              <p><span className="font-bold text-charcoal">8.1</span> 您在本平台上传、提交、发布的原创内容，其著作权原则上归您或原始权利人所有，您授权本平台拥有保留及除商用盈利外之一切同等权利；但本协议另有约定或适用法律另有规定的除外。</p>
              <p><span className="font-bold text-charcoal">8.2</span> 为使本平台能够进行接收、审核、退修、排版、发表、展示、检索、链接、存储、归档、备份、索引、格式转换、纠纷处理、合规管理和平台宣传，您亦授予本平台及实现前述目的所必需的合作方一项全球范围内、非独占、免版税的使用许可。</p>
              <p><span className="font-bold text-charcoal">8.3</span> 前述许可包括但不限于复制、存储、整理、编排、格式化、展示、公开传播、建立索引、归档、备份、生成元数据、截取必要片段、为专题页或期刊目录进行展示，以及在与本平台运营直接相关的说明、介绍、归档和宣传材料中合理使用。</p>
              <p><span className="font-bold text-charcoal">8.4</span> 对已发表稿件，为维持学术记录、索引系统、归档体系、页面可访问性和历史版本管理，前述许可在合理必要范围内为持续有效，不因您停止使用平台、注销账号或单方反悔而当然终止。</p>
              <p><span className="font-bold text-charcoal">8.5</span> 您保证您提交、发布或上传的内容系原创，或已取得合法充分授权；如含第三方文字、图表、图片、数据库、代码、附件或其他材料，您应确保已取得必要许可或依法合理使用并按要求标注来源。</p>
              <p><span className="font-bold text-charcoal">8.6</span> 因您的内容引发任何第三方争议、投诉、索赔或诉讼的，由您独立承担责任；因此给本平台造成损失的，您应负责赔偿。</p>
              <p><span className="font-bold text-charcoal">8.7</span> 本平台网站界面、页面设计、版式、系统程序、数据库结构、平台名称、标识、Logo、规则文本及其他由本平台依法享有权利的内容，其相关权利均归本平台或相关权利人所有。未经书面许可，任何人不得擅自使用。</p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* 第九条 */}
            <h2 className="text-xl font-bold mt-10 mb-6 text-charcoal">9. 平台内容的使用限制</h2>
            <div className="pl-4 space-y-4 text-gray-700">
              <p><span className="font-bold text-charcoal">9.1</span> 除作者另有授权、页面另有说明或平台另有公告外，您仅可为个人、非商业、学习、研究、评论与合理引用之目的访问和使用本平台内容。</p>
              <p><span className="font-bold text-charcoal">9.2</span> 未经本平台或相关权利人事先书面许可，您不得：</p>
              <ul className="list-none space-y-1 text-sm italic">
                <li>（1）具盈利、商用性或除学术、宣传平台外地，复制、转载、发布、传播、出售、出租、再许可、改编、镜像、汇编、数据库化、目录化本平台内容；</li>
                <li>（2）系统性抓取、深度链接、批量下载、离线复制、建立内容库或据以形成替代性服务；</li>
                <li>（3）使用 robots、spiders、crawlers、offline readers、自动化程序、脚本、接口模拟工具或其他类似方式持续访问、抓取、抽取、索引本平台内容；</li>
                <li>（4）绕过 robots 协议、访问频率限制、权限控制、反爬机制或其他技术保护措施；</li>
                <li>（5）探测、扫描、测试本平台系统、网络或安全机制的弱点，或尝试未经授权访问任何服务器、账号、数据库、后台功能；</li>
                <li>（6）将本平台内容用于任何人工智能、机器学习、算法模型、大语言模型或其他自动化系统的训练、测试、微调、分析、生成输出或开发用途；</li>
                <li>（7）删除、遮蔽、篡改作者署名、来源信息、风险提示、AI 标识、版权声明或其他权利说明；</li>
                <li>（8）利用本平台发布广告、商业招揽或向其他用户推销商品、服务、平台或订阅。</li>
              </ul>
              <p><span className="font-bold text-charcoal">9.3</span> 您对本平台内容进行合理引用时，应保留作者、标题、来源链接或其他足以追溯的出处信息，并遵守适用法律及作者授权条件。</p>
              <p><span className="font-bold text-charcoal">9.4</span> 未经书面许可，您不得对本平台软件、页面程序、系统接口或相关技术进行反向工程、反向汇编、反向编译或其他试图获取源代码、底层逻辑或保护机制的行为。</p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* 第十条 */}
            <h2 className="text-xl font-bold mt-10 mb-6 text-charcoal">10. 免责声明与责任限制</h2>
            <div className="pl-4 space-y-4 text-gray-700">
              <p><span className="font-bold text-charcoal">10.1</span> 本平台发表的稿件、评论及其他用户内容，仅代表作者或发布者本人观点，不代表本平台立场。</p>
              <p><span className="font-bold text-charcoal">10.2</span> 本平台对用户内容的审核、分区、展示、折叠、删除、限制或继续展示，不构成对该内容真实性、合法性、准确性、完整性、专业性或安全性的保证或背书。</p>
              <p><span className="font-bold text-charcoal">10.3</span> 本平台不保证服务持续不中断、绝对无误、绝对安全或完全符合您的预期。</p>
              <p><span className="font-bold text-charcoal">10.4</span> 因网络环境、服务器故障、系统维护、第三方服务异常、恶意攻击、不可抗力或其他本平台无法控制的原因造成的服务中断、信息延迟、功能异常或数据风险，本平台将在合理范围内尽力处理，但不承担绝对保证责任。</p>
              <p><span className="font-bold text-charcoal">10.5</span> 本平台内容及用户内容不当然构成医疗、法律、金融、心理或任何其他专业建议。特别是涉及医学、药物、现实法律后果、安全操作或其他高风险事项时，您应自行判断并在必要时咨询具备资质的专业人士。</p>
              <p><span className="font-bold text-charcoal">10.6</span> 本平台可能包含第三方链接、外部资源或第三方服务入口。本平台不对第三方内容、产品、服务、广告或交易作任何背书，也不对您与第三方之间的交易或争议负责。</p>
              <p><span className="font-bold text-charcoal">10.7</span> 在适用法律允许的最大范围内，本平台不对因使用或无法使用本平台、依赖平台内容、用户内容违规、第三方服务异常、账号安全事件、数据丢失、商业损失、利润损失、声誉损失或其他间接、附带、惩罚性损害承担责任。</p>
              <p><span className="font-bold text-charcoal">10.8</span> 如因您违反本协议、平台规则或适用法律，导致本平台遭受索赔、处罚、损失或费用支出的，您应予赔偿并使本平台免责。</p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* 第十一条 */}
            <h2 className="text-xl font-bold mt-10 mb-6 text-charcoal">11. 违约处理、服务限制与终止</h2>
            <div className="pl-4 space-y-4 text-gray-700">
              <p><span className="font-bold text-charcoal">11.1</span> 如您违反本协议、平台规则或适用法律，本平台有权根据情节轻重采取一项或多项措施，包括但不限于：提醒、警告、要求补正、退回修改、拒稿、删除内容、折叠内容、限制展示、限制互动、限制投稿、暂停账号、封禁账号、下架内容、撤稿标记或终止服务等。</p>
              <p><span className="font-bold text-charcoal">11.2</span> 对明显违法、严重侵权、恶意投稿、恶意引战、隐私泄露、伪造数据/引用、AI 直出整稿、攻击系统、批量滥用或其他重大风险行为，本平台可不经事先通知直接采取限制措施。</p>
              <p><span className="font-bold text-charcoal">11.3</span> 本平台可基于技术、运营、合规、安全、学术治理或风控需要，随时暂停、限制、变更或终止全部或部分服务。</p>
              <p><span className="font-bold text-charcoal">11.4</span> 您可以随时停止使用本平台；但停止使用、账号注销或其他关系终止，不影响已生效的内容授权、已发表内容的保留、历史归档、侵权处理、争议处理及责任承担条款的继续有效。</p>
              <p><span className="font-bold text-charcoal">11.5</span> 本平台终止服务后，您基于本协议取得的访问和使用权限立即终止；但本协议中关于知识产权、免责、责任限制、赔偿、争议解决等条款继续有效。</p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* 第十二条 */}
            <h2 className="text-xl font-bold mt-10 mb-6 text-charcoal">12. 协议变更与其他</h2>
            <div className="pl-4 space-y-4 text-gray-700">
              <p><span className="font-bold text-charcoal">12.1</span> 本平台有权根据法律变化、运营需要、服务升级、规则优化、风控要求或学术治理需要，对本协议进行修改。</p>
              <p><span className="font-bold text-charcoal">12.2</span> 修改后的协议可通过页面公告、站内通知、电子邮件或其他合理方式发布。修改生效后，您继续使用本平台的，视为接受更新后的协议；如您不同意，应立即停止使用本平台。</p>
              <p><span className="font-bold text-charcoal">12.3</span> 本平台未行使或延迟行使本协议项下任何权利，不构成对该权利的放弃。</p>
              <p><span className="font-bold text-charcoal">12.4</span> 本协议任何条款被认定为无效、违法或不可执行的，不影响其他条款的效力。</p>
              <p><span className="font-bold text-charcoal">12.5</span> 未经本平台书面同意，您不得转让本协议项下的任何权利义务。</p>
              <p><span className="font-bold text-charcoal">12.6</span> 本协议标题仅为阅读方便而设，不影响条款解释。</p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* 第十三条 */}
            <h2 className="text-xl font-bold mt-10 mb-6 text-charcoal">13. 法律适用与争议解决</h2>
            <div className="pl-4 space-y-4 text-gray-700">
              <p><span className="font-bold text-charcoal">13.1</span> 在不违反适用法律强制性规定的前提下，本协议的订立、效力、履行、解释与争议解决，原则上适用英格兰及威尔士法律。</p>
              <p><span className="font-bold text-charcoal">13.2</span> 因本协议或本平台服务引起或与之有关的任何争议，双方应先友好协商解决；协商不成的，提交平台管理团队所在地管辖权的法院处理。</p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* 第十四条 */}
            <h2 className="text-xl font-bold mt-10 mb-6 text-charcoal">14. 联系方式</h2>
            <div className="pl-4 space-y-6 text-gray-700">
              <p>
                <span className="font-bold text-charcoal">14.1</span> 如您对本协议、账号处理、投稿审核、侵权投诉、评论区治理或其他平台规则有任何疑问、意见、投诉或举报，可通过以下方式联系本平台：<br/>
                联系邮箱：<a href="mailto:support@shitjournal.org" className="text-accent-gold underline">support@shitjournal.org</a>
              </p>
              <p>
                <span className="font-bold text-charcoal">14.2</span> 如您主张平台内容侵犯您的著作权、名誉权、隐私权或其他合法权益，请尽量提供权利证明、内容链接或定位信息、具体主张、联系方式及真实性说明，以便本平台核实处理。
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};