import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const PrivacyPolicy: React.FC = () => {
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
            <h1 className="text-3xl font-serif font-bold text-charcoal mb-4">SHIT Journal 隐私政策</h1>
            <div className="flex justify-center gap-6 text-sm text-gray-500 font-mono">
              <span>版本号: v1.0</span>
              <span>生效日期: 2026/03/06</span>
            </div>
          </div>

          {/* 正文区域 */}
          <div className="prose prose-sm md:prose-base max-w-none text-charcoal leading-loose">
            
            <p className="font-bold mb-8">引言</p>
            <p className="mb-8">
              欢迎您使用 SHIT Journal 非营利性学术期刊网站（以下简称「本网站」或「我们」）的服务。本网站非常重视用户的个人信息和隐私保护。我们深知个人信息对您的重要性，并会严格按照法律法规要求，采取相应的安全保护措施来保护您的个人信息安全。请您在使用本网站各项功能前仔细阅读并充分理解本隐私政策。如您开始使用本网站服务，即表示您已充分理解并同意本政策的全部内容。
            </p>
            <p className="mb-8">本隐私政策将帮助您了解以下内容：</p>
            <ul className="list-disc pl-5 mb-8 text-gray-600 font-bold">
              <li>信息收集的范围与目的</li>
              <li>第三方服务的使用说明</li>
              <li>信息的存储与安全保障措施</li>
              <li>用户权利与数据管理方式</li>
              <li>评论区及公开信息管理政策</li>
              <li>隐私政策的更新说明</li>
              <li>未成年人个人信息保护政策</li>
              <li>如何联系我们</li>
            </ul>

            <hr className="my-8 border-gray-200" />

            {/* 第1部分 */}
            <h2 className="text-xl font-bold mt-10 mb-6 text-charcoal">1. 信息收集的范围与目的</h2>
            <p className="mb-4">我们会按照合法、正当、必要的原则，仅收集实现本网站功能所必要的个人信息。具体而言：</p>
            <div className="pl-4 space-y-6 text-gray-700">
              <p>
                <span className="font-bold text-charcoal">1.1 注册信息：</span> 当您注册本网站账户时，我们会收集您的电子邮箱用于账号注册、登录验证及必要的通知沟通。您也需要设置用户名（昵称）和密码。我们不强制要求实名注册，您提供真实姓名纯属自愿。如果您选择提供，视为您同意我们处理该信息用于身份验证或学术署名。
              </p>
              <p>
                <span className="font-bold text-charcoal">1.2 投稿与内容：</span> 您可以通过本网站上传学术稿件（仅限文字类）。稿件中可能包含您选择提供的作者姓名、单位等信息。我们收集这些稿件内容是为了实现稿件审核、发表及展示功能。一旦您的稿件通过初审并正式发表，稿件内容将被公开展示且无法撤回或删除，以确保学术记录的完整性。
              </p>
              <p>
                <span className="font-bold text-charcoal">1.3 评论与互动信息：</span> 当您在本网站发表评论、评分或进行其他互动时，我们会收集您提交的评论内容、评分及相关操作信息，以实现内容展示和互动功能。您的评论内容和昵称将公开显示给网站的登录用户，但您的电子邮箱等敏感信息不会在公开区域展示。
              </p>
              <p>
                <span className="font-bold text-charcoal">1.4 日志及设备信息：</span> 在您使用本网站服务过程中，我们的服务器会自动记录您对网站的访问和操作日志，包括登录时间、访问路径、操作动作等。这些信息有助于我们维护服务安全、优化产品体验。此外，我们可能收集您使用的设备信息（例如设备类型、浏览器类型、操作系统版本等）和网络信息（如 IP 地址）。收集上述信息是用于保障账户安全、改进我们的服务性能及用户体验。
              </p>
              <p>
                <span className="font-bold text-charcoal">1.5 其他可能收集的信息：</span> 为了提供更好的移动端服务，未来我们可能会在取得您的同意后，收集您的移动端浏览记录及其他设备标识信息（如设备识别码等）。若此类信息涉及个人敏感信息，我们将再次征求您的明示同意。我们承诺遵循最小化原则，仅在实现功能所必需时收集您的信息。
              </p>
              <p>
                <span className="font-bold text-charcoal">1.6 Cookie 与同类技术：</span> 我们可能使用 Cookie 或类似技术以支持登录会话、负载均衡、网站分析与安全防护。您可以通过浏览器设置控制 Cookie；但若禁用某些 Cookie，可能导致您无法正常登录或使用部分功能。
              </p>
              <p>
                <span className="font-bold text-charcoal">1.7 非营利与最小化原则：</span> 本网站为非营利性学术平台。我们不会出售您的个人信息，也不会以对外贩售数据作为运营模式。我们处理信息的范围将尽量限定于提供学术出版与社区互动服务所必需的程度。
              </p>
            </div>
            <p className="mt-6 mb-8">上述信息的收集旨在为您提供、改进或维护我们的服务，包括但不限于：实现用户注册登录、稿件提交与发布、用户互动交流，以及保障账户及内容安全等。若我们拟将您的个人信息用于本政策未载明的其他用途，会事先征求您的同意。</p>

            <hr className="my-8 border-gray-200" />

            {/* 第2部分 */}
            <h2 className="text-xl font-bold mt-10 mb-6 text-charcoal">2. 第三方服务的使用说明</h2>
            <p className="mb-4">本网站在提供服务过程中会使用第三方服务或工具，我们会严格评估这些第三方的安全性，并遵循信息最小化共享的原则：</p>
            <div className="pl-4 space-y-6 text-gray-700">
              <p>
                <span className="font-bold text-charcoal">2.1 云服务器与存储服务：</span> 本网站的数据托管在第三方提供的云服务器上。这意味着您的个人信息（如电子邮箱、投稿内容等）将被传输并存储在云端服务器上。我们选择可信赖的云服务提供商，并遵循严格的保密和数据保护机制，以确保您的数据获得足够的安全保障。第三方云服务提供商仅按照我们的指示处理您的信息，且无权将您的信息用于提供服务之外的任何用途。
              </p>
              <p>
                <span className="font-bold text-charcoal">2.2 内容审核与过滤：</span> 为维护健康的学术交流环境，我们使用第三方提供的内容审核 API 对评论区内容进行自动筛查，以过滤违法违规言论。该 API 可能会对您发布的评论内容进行识别分析。我们会采用去标识化等方式，并仅发送必要的文本信息给第三方审核服务，以保障您的个人信息不被过度提供。第三方审核服务提供商有义务对其接触的信息保密，不会将其用于审查以外的用途。
              </p>
              <p>
                <span className="font-bold text-charcoal">2.3 第三方链接及插件：</span> 本网站目前禁止未登录用户访问，也未集成第三方社交登录或广告插件。在您登录并使用本网站过程中，您的个人信息不会被非授权的第三方获取。若未来我们引入其他第三方工具（例如用于数据分析或社交分享），我们将通过页面公告或更新本政策告知您相关情况，并在必要时征求您的同意。
              </p>
              <p>
                <span className="font-bold text-charcoal">2.4 法律原因、权利保护与组织变更：</span><br />
                在以下情形，我们可能披露您的信息（或在必要时转移相关数据）：<br />
                （1）为遵守适用法律法规、法律程序或政府机关依法提出的要求；<br />
                （2）为侦测、防止或处理安全、欺诈、滥用或技术问题；<br />
                （3）为保护本网站、用户或他人的权利、财产与安全；<br />
                （4）若本网站发生合并、资产转移、重组或类似交易，相关信息可能作为交易的一部分被移转（我们会要求接收方继续遵守相当的数据保护义务）
              </p>
              <p>
                <span className="font-bold text-charcoal">2.5 聚合、匿名化信息：</span> 在不识别个人身份的前提下，我们可能使用并对外分享聚合或匿名化的统计信息（例如访问量、使用趋势），用于网站分析与服务改进。
              </p>
            </div>
            <p className="mt-6 mb-8">除上述情形外，我们不会将您的个人信息提供给任何第三方，除非获得您的明示同意，或依据法律法规的强制要求（例如按照司法机关或监管部门的要求提供）。如第一条我们也不会出售任何用户个人信息。</p>

            <hr className="my-8 border-gray-200" />

            {/* 第3部分 */}
            <h2 className="text-xl font-bold mt-10 mb-6 text-charcoal">3. 信息的存储与安全保障措施</h2>
            <p className="mb-4">我们非常重视对您个人信息的安全保护，并采取业界公认的安全措施来存储和保护您的信息：</p>
            <div className="pl-4 space-y-6 text-gray-700">
              <p>
                <span className="font-bold text-charcoal">3.1 存储地点和期限：</span> 您的个人信息将被存储在安全的云端服务器上。目前我们的服务器位于爱尔兰。我们会依据当地法律法规要求，就用户个人信息存储的有关事项进行安全评估 and 保护。您的个人信息的保存期限原则上为实现处理目的所必需的最短时间。例如，账号注册信息将在您的账户存续期间保存；当您注销账户后，我们将删除或匿名化处理您的个人信息（法律法规另有要求的除外）。对于发布的学术稿件，由于涉及学术记录的持久保存，我们将长期保留已发表稿件及其中包含的作者署名等信息。
              </p>
              <p>
                <span className="font-bold text-charcoal">3.2 安全措施：</span> 我们采取多种安全技术和管理措施来保护您的个人信息，防止信息遭到未授权访问、篡改、泄露或毁损。例如，我们使用 TLS/SSL 协议加密传输敏感数据，并通过加密算法对密码等敏感字段进行存储处理。同时，我们采用受信赖的防护机制防止数据遭到恶意攻击，并部署严格的访问控制措施，确保只有授权人员才可访问您的个人信息。我们定期对系统和业务进行安全审计与监测，及时发现和处理可能的安全风险。
              </p>
              <p>
                <span className="font-bold text-charcoal">3.3 人员与组织管理：</span> 我们建立了内部安全管理制度。我们的成员都有深度的隐私保护纪律及学习，明确在处理用户信息时的职责和规范。任何违反保密义务的人员将面临纪律措施乃至法律责任。
              </p>
              <p>
                <span className="font-bold text-charcoal">3.4 安全事件处置：</span> 尽管有上述安全措施，请您理解，由于技术的局限及可能存在的各种恶意手段，任何互联网环境都无法完全确保百分之百安全。如果我们的物理、技术或管理防护措施遭到破坏，导致您的信息出现安全漏洞，我们将启动应急预案，尽力阻止安全事件扩大，并及时按法律法规要求告知您，安全事件的基本情况和可能影响、我们已采取或将要采取的处置措施、您可自主防范和降低风险的建议、对您的补救措施等。我们还将按照监管要求主动上报安全事件的处理情况。
              </p>
              <p>
                <span className="font-bold text-charcoal">3.5 提示您注意：</span> 请您务必妥善保管好您的账户登录凭据（用户名、邮箱及密码）。本网站的登录仅限您本人使用，我们不会主动要求您提供密码。若您发现个人账号或密码泄露或出现异常情况，请您立即联系我们，以便我们协助您采取相应措施保障安全。
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* 第4部分 */}
            <h2 className="text-xl font-bold mt-10 mb-6 text-charcoal">4. 用户权利与数据管理方式</h2>
            <p className="mb-4">我们依法保障您对自己的个人信息行使以下权利，您可以通过账户设置或联系我们的方式行使：</p>
            <div className="pl-4 space-y-6 text-gray-700">
              <p>
                <span className="font-bold text-charcoal">4.1 访问和更正您的信息：</span> 您有权查阅并更新您提供给我们的个人资料信息。登录账户后，您可以在“编辑资料”或个人设置页面查看、修改您的昵称（每180自然日）等基本信息。您也可以在个人账户中查看您的部分历史操作记录（如投稿历史等），以便了解您的账户使用情况。对于注册邮箱等关键信息，如需修改，您可能需要通过额外验证。我们将在技术可行范围内及时满足您的更正请求。
              </p>
              <p>
                <span className="font-bold text-charcoal">4.2 删除您的信息：</span> 您可以自行删除在本网站发表的评论等内容。但请注意，出于维护学术记录和社区履历的考虑，您提交的稿件一经发表除被拒稿或二次审查发现违规内容外将无法删除或撤回。对于尚未公开的个人信息，您也可以通过删除账户的方式清除相关数据。除法律法规另有规定外，在您成功注销账户后，我们将停止为您提供服务，并删除或匿名化处理您的个人信息。
              </p>
              <p>
                <span className="font-bold text-charcoal">4.3 账户注销：</span> 您有权请求注销您的 SHIT Journal 账户。您可以在账号设置中提交注销申请，或通过下文提供的联系方式联系我们. 为保障安全，我们可能会要求您进行必要的身份核验。账号注销完成后，我们将停止为您提供服务，并依据法律要求删除或匿名化您的个人信息。但已公开发表的稿件、评论及其中作者信息将可能继续保留在公开的期刊记录中。
              </p>
              <p>
                <span className="font-bold text-charcoal">4.4 获取副本和转移：</span> 在符合相关法律规定的前提下，您有权向我们请求获取您个人信息的副本，或在技术可行时请求我们将其传输给指定的第三方。我们将在核实您的身份和请求合法性后予以提供。
              </p>
              <p>
                <span className="font-bold text-charcoal">4.5 撤回同意与限制处理：</span> 对于您授权我们收集使用的个人信息，您有权撤回先前的同意或要求限制对特定信息的处理。如果您撤回同意，我们将不再收集或使用相应的信息。但请理解，撤回同意可能导致相关功能无法继续提供。您撤回同意的决定不会影响此前基于您的授权所进行的信息处理。
              </p>
              <p>
                <span className="font-bold text-charcoal">4.6 约束自动决策：</span> 对于本网站基于非人工自动决策机制作出的一些决定，您有权获得解释，并拒绝仅通过自动化决策方式做出的对您的个人信息处理决定，除非该决策是与您签订或履行合同所必需，或已获得您的明确同意。
              </p>
              <p>
                <span className="font-bold text-charcoal">4.7 响应您的请求：</span> 若您希望行使上述权利，可以通过本政策提供的联系方式与我们联系。为保障安全，我们可能需要验证您的身份，然后再处理您的请求。我们将在合理期限内（通常不超过 30 个工作日）答复您的请求。对于您合理的请求，我们将原则上免费处理；对于重复频繁或无端的请求，我们可能会拒绝或收取一定成本费用。
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* 第5部分 */}
            <h2 className="text-xl font-bold mt-10 mb-6 text-charcoal">5. 评论区及公开信息管理政策</h2>
            <p className="mb-4">本网站旨在打造诚信、安全的学术交流社区。为此，我们对用户在评论区和稿件公开信息的管理规定如下：</p>
            <div className="pl-4 space-y-6 text-gray-700">
              <p>
                <span className="font-bold text-charcoal">5.1 公开可见的信息：</span> 当您在本网站发表稿件、评论、评分等内容时，除非另有提示，这些内容将默认对所有登录用户公开可见。公开的信息包括您的投稿内容、评论内容以及您的昵称、头像等基本资料。我们不会公开显示您的电子邮箱、注册 IP 等隐私信息。
              </p>
              <p>
                <span className="font-bold text-charcoal">5.2 内容合规与审核：</span> 您在本网站发布的任何内容（包括稿件和评论）应遵守相关法律法规和社区准则，不得含有违法、侵权、侮辱、色情等不当信息。我们已经实施人工或自动的内容审核措施，对于涉嫌违反法律或政策的言论会进行过滤或删除。特别地，我们使用第三方内容审核工具自动筛查违法言论，如第 2 条所述，以尽可能及时发现并处理违规内容。对于情节严重的违规行为，我们有权采取警告、删帖、暂停或注销账户等措施。
              </p>
              <p>
                <span className="font-bold text-charcoal">5.3 投稿内容的不可撤回：</span> 您提交至本网站的学术稿件一旦通过审核并正式发表，将被视为对外正式出版的期刊内容。为了维护学术记录的完整和引用的持续有效性，已发表的稿件将不可撤回或删除，即使您之后删除账户或提出删除请求。本网站有权保留已发表内容及作者署名信息，并在必要时对外展示或存档。
              </p>
              <p>
                <span className="font-bold text-charcoal">5.4 互动信息保存：</span> 本网站会保存用户在评论区的互动记录，包括评论内容、点赞、评分等操作信息。这些记录用于营造正常的学术讨论氛围，并作为社区管理和纠纷处理的依据。除非法律要求或用户自行删除（如删除自己发表的评论），我们通常会长期保留这些公开互动记录。
              </p>
              <p>
                <span className="font-bold text-charcoal">5.5 个人敏感信息保护：</span> 我们建议您在公开交流中谨慎发布可能涉及个人隐私或敏感的信息（例如真实姓名、电话、地址等）。如您在稿件或评论中自行公开了个人信息，您需要自行承担因此可能产生的风险。本网站也将尽力通过技术手段避免敏感信息的意外披露。
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* 第6部分 */}
            <h2 className="text-xl font-bold mt-10 mb-6 text-charcoal">6. 隐私政策的更新说明</h2>
            <p className="mb-4">为了给您提供更好的服务，本隐私政策可能适时更新。我们修改隐私政策时，会遵循适用法律法规的要求，并通过合理的方式告知您：</p>
            <div className="pl-4 space-y-6 text-gray-700">
              <p>
                <span className="font-bold text-charcoal">6.1 通知方式：</span> 隐私政策的更新将公布在本页面上，更新后的条款将立即生效。对于重大变更，我们会通过网站公告、向您注册邮箱发送邮件或其它显著方式另行通知您，以说明变更内容。如修订内容需要征得您的同意，我们将在适当范围内再次征求您的明确同意。
              </p>
              <p>
                <span className="font-bold text-charcoal">6.2 重大变更的范围：</span><br />
                一般而言，下列情形属于本政策可能的重大变更：<br />
                (1) 我们的服务模式发生重大变化，如处理个人信息的目的、类型、使用方式等发生变化；<br />
                (2) 我们在所有权结构、组织架构等方面发生重大变化，如并购重组等；<br />
                (3) 个人信息共享、转让或公开披露的主要对象发生变化；<br />
                (4) 您参与个人信息处理方面的权利及其行使方式发生重大变化；<br />
                (5) 我们负责处理个人信息安全的部门、联络方式发生变化；<br />
                (6) 个人信息安全影响评估报告表明存在高风险时。
              </p>
              <p>
                <span className="font-bold text-charcoal">6.3 旧版存档：</span> 为了便于您查阅，我们会将本政策的历史版本存档并提供查看方式，以供您查阅和比较。
              </p>
            </div>
            <p className="mt-6 mb-8">如果您不同意更新后的政策内容，您有权停止使用本网站服务。在新政策生效后，您继续使用本网站的行为将视为您接受修订后的政策。</p>

            <hr className="my-8 border-gray-200" />

            {/* 第7部分 */}
            <h2 className="text-xl font-bold mt-10 mb-6 text-charcoal">7. 未成年人个人信息保护政策</h2>
            <p className="mb-4">本网站的服务主要面向成年用户。我们非常重视未成年人个人信息的保护，并遵守相关法律法规的规定：</p>
            <div className="pl-4 space-y-6 text-gray-700">
              <p>
                <span className="font-bold text-charcoal">7.1 非针对未成年人：</span> 本网站提供的内容和服务主要面向具有完全民事行为能力的成人用户，非针对未满 18 周岁的未成年人。如果您未满 18 周岁，请在您的父母或其他监护人陪同下阅读本隐私政策并使用本网站，或请您立即停止使用。
              </p>
              <p>
                <span className="font-bold text-charcoal">7.2 14 周岁以下儿童：</span> 如果您未满 14 周岁，在使用本网站服务前应在父母或监护人的监护下进行，并务必取得监护人的同意。我们不会在明知的情况下收集 14 周岁以下未成年人的个人信息。若我们发现在未经可证实的监护人同意的情况下收集了未满 14 周岁儿童的个人信息，我们将尽快删除相关数据。
              </p>
              <p>
                <span className="font-bold text-charcoal">7.3 监护人责任：</span> 作为未成年人的监护人，请您关注未成年人在网络活动中的隐私保护和安全教育。如果您对所监护未成年人的个人信息处理有疑问，请通过本政策提供的联系方式与我们联系，我们会在核实您的身份后协助您处理相关问题。
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* 第8部分 */}
            <h2 className="text-xl font-bold mt-10 mb-6 text-charcoal">8. 如何联系我们</h2>
            <div className="pl-4 space-y-6 text-gray-700">
              <p>
                <span className="font-bold text-charcoal">8.1</span> 如果您对本隐私政策有任何疑问、意见或请求，或需投诉举报，您可以通过以下方式与我们联系：联系邮箱：<a href="mailto:support@shitjournal.org" className="text-accent-gold underline">support@shitjournal.org</a>
              </p>
              <p>
                <span className="font-bold text-charcoal">8.2</span> 我们设有个人信息保护专职联系人，将在验证您的身份并了解您的诉求后尽快予以答复。一般情况下，我们将在收到您的问询或请求后 30 个工作日内给予回复。
              </p>
              <p>
                <span className="font-bold text-charcoal">8.3</span> 感谢您阅读本隐私政策。您对本网站的使用即表示您已理解并同意我们按照本政策收集、使用和保护您的相关信息。我们将继续致力于保护您的个人信息安全，为您提供更优质、安心的服务。
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
    );
};