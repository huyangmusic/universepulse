const fs = require('fs');
const files = ['zh', 'ja', 'es', 'ar', 'fr'];

const legalZH = {
  back: '← 返回首页',
  privacy: {
    title: '隐私政策',
    description: 'UniversePulse 如何收集和使用您的数据。',
    updated: '最后更新：2026年9月4日',
    contact: '如果您对本隐私政策有任何疑问，请通过以下方式联系我们：',
    sections: [
      { heading: '1. 我们收集的信息', content: 'UniversePulse 不收集、存储或出售任何个人数据。我们不使用跟踪 Cookie，也不维护用户账户。我们唯一处理的数据是您在生日计算器中自愿输入的出生日期，该数据完全在您的浏览器中处理，永远不会传输到我们的服务器。' },
      { heading: '2. 我们如何使用信息', content: '由于我们不收集个人数据，因此不会使用或处理任何关于您的信息。您输入的出生日期仅在您的浏览器中本地使用，用于计算个人统计数据。这些数据不会发送给任何第三方。' },
      { heading: '3. Google Analytics', content: '我们使用 Google Analytics（gtag.js）来了解访客与网站的互动情况。Google Analytics 以匿名聚合形式收集标准的互联网日志信息和访客行为信息，不会识别个人用户。Google 的隐私政策适用于其分析服务收集的数据。' },
      { heading: '4. 数据安全', content: '由于我们不收集个人数据，因此没有需要保护的个人数据。所有计算都在您的浏览器客户端完成。我们使用 HTTPS 来保护您的浏览器与我们的服务器之间的连接。' },
      { heading: '5. 第三方服务', content: '我们使用 Google Analytics 进行站点分析。使用我们的网站即表示您同意 Google Analytics 按照其隐私政策收集和发布信息：https://policies.google.com/privacy' },
      { heading: '6. 儿童隐私', content: 'UniversePulse 不适合13岁以下儿童使用。我们不会故意收集13岁以下儿童的个人信息。如果您是家长，认为您的孩子向我们提供了个人信息，请联系我们。' },
      { heading: '7. 政策更新', content: '我们可能会不时更新本隐私政策。我们将通过在本页发布新隐私政策并更新"最后更新"日期来通知您任何变更。' },
      { heading: '8. 联系我们', content: '如果您对本隐私政策有任何疑问，请通过 support@universepulse.net 联系我们。' }
    ]
  },
  terms: {
    title: '服务条款',
    description: '使用 UniversePulse 的条款和条件。',
    updated: '最后更新：2026年9月4日',
    contact: '如果您对这些条款有任何疑问，请通过以下方式联系我们：',
    sections: [
      { heading: '1. 条款接受', content: '通过访问和使用 UniversePulse，您接受并同意受本服务条款的约束。如果您不同意这些条款，请勿使用我们的服务。' },
      { heading: '2. 服务描述', content: 'UniversePulse 基于联合国经社部（UN DESA）、国际能源署（IEA）、BP 和 FAO 等权威来源的年度平均值，提供实时全球数据估算。所有显示值均为用于教育和信息目的的数学近似值，不代表精确的实时测量数据。' },
      { heading: '3. 数据准确性免责声明', content: 'UniversePulse 上展示的数据源自将年度平均率转换为每秒估算值的计算。虽然我们使用了权威来源，但所有数值均为近似值。UniversePulse 不对数据的准确性、完整性或及时性做出任何保证。用户不应在未核对原始来源的情况下依赖数据用于任何特定目的。' },
      { heading: '4. 知识产权', content: 'UniversePulse 上的所有内容，包括文本、图形、徽标和设计元素，均为 UniversePulse 或其许可方的财产，受版权和其他知识产权法律保护。' },
      { heading: '5. 用户行为', content: '您同意仅将 UniversePulse 用于合法目的。您可以在社交媒体和其他平台上分享我们内容的链接。未经明确许可，您不得转售、重印或将我们的内容用于商业目的。' },
      { heading: '6. 责任限制', content: '对于因您使用或无法使用本服务而产生的任何间接、附带、特殊、后果性或惩罚性损害，UniversePulse 不承担责任。所提供数据仅供教育用途，不得用于科学、财务或其他专业决策。' },
      { heading: '7. 条款修改', content: '我们保留随时修改本条款的权利。变更后继续使用本服务即视为接受新条款。' },
      { heading: '8. 适用法律', content: '本条款应受适用法律管辖并按其解释，不考虑法律冲突原则。' }
    ]
  },
  about: {
    title: '关于 UniversePulse',
    description: '我们的使命是让全球数据变得个性化且易于理解。',
    intro: 'UniversePulse 是一个实时全球数据仪表盘，将抽象的宏观统计数据转化为个性化、富有情感共鸣的体验。我们相信，了解全球人口、资源消耗和环境变化应该是每个人都能接触到的、美好的且有意义的事情。',
    mission: '我们的使命是帮助地球上的每个人理解自己在全球系统中的位置——不是作为被动的观察者，而是作为人类和地球 ongoing 故事中的积极参与者。当您输入出生日期时，您会发现全球变化背后的数字也是您的数字。',
    data: 'UniversePulse 上的所有数据均来自权威年度来源，包括联合国经济和社会事务部（UN DESA）、国际能源署（IEA）、BP 统计评论、FAO 和全球碳项目。年度总量通过数学模型转换为每秒平均率。这些是用于教育展示的估算值，而非精确测量数据。',
    team: 'UniversePulse 是一个独立项目，使用 Next.js、TypeScript 和 Tailwind CSS 构建。我们是一个热爱数据可视化、气候变化意识并致力于让复杂的全球统计数据触手可及的小型团队。',
    contact: '我们很乐意倾听您的声音。请联系：'
  },
  contact: {
    title: '联系我们',
    description: '与 UniversePulse 团队取得联系。',
    intro: '有问题、建议或反馈？我们很乐意听到您的声音。最佳联系方式是通过电子邮件。',
    methods: '目前我们在工作日 48 小时内回复所有邮件。如有紧急事项，请在主题行中注明"紧急"。',
    email: '电子邮件',
    response: '回复时间',
    responseTime: '我们力求在工作日（周一至周五，节假日除外）的 48 小时内回复所有咨询。'
  }
};

const legalJA = {
  back: '← ホームに戻る',
  privacy: {
    title: 'プライバシーポリシー',
    description: 'UniversePulse のデータ収集と利用方法について。',
    updated: '最終更新日：2026年9月4日',
    contact: 'このプライバシーポリシーについてのご質問は、までお問い合わせください。',
    sections: [
      { heading: '1. 収集する情報', content: 'UniversePulse は個人データを収集、保存、または販売しません。追跡用のクッキーは使用せず、ユーザーアカウントも管理していません。私たちが処理する唯一のデータは、あなたが自発的に入力する生年月日で、これは完全にブラウザ内で処理され、サーバーには一切送信されません。' },
      { heading: '2. 情報の使用方法', content: '個人データを収集しないため、あなたの情報を使用または処理することはありません。入力した生年月日は、ブラウザ内で個人的な統計を計算するためにローカルで使用され、第三者には送信されません。' },
      { heading: '3. Google Analytics', content: '訪問者とサイトとのインタラクションを理解するために Google Analytics（gtag.js）を使用しています。Google Analytics は、標準的なインターネットログ情報と訪問者行動情報を匿名の集計形式で収集します。個人を特定するものではありません。Google のプライバシーポリシーが、アナリティクスサービスによって収集されるデータに適用されます。' },
      { heading: '4. データセキュリティ', content: '個人データを収集しないため、保護すべき個人情報はありません。すべての計算はブラウザ内でクライアントサイドで行われます。HTTPS を使用して、ブラウザとサーバー間の接続を保護しています。' },
      { heading: '5. サードパーティーサービス', content: 'サイト分析のために Google Analytics を使用しています。当サイトを使用することで、あなたは Google Analytics のプライバシーポリシー（https://policies.google.com/privacy）に従った情報の収集と利用に同意したものとみなされます。' },
      { heading: '6. 子供のプライバシー', content: 'UniversePulse は13歳未満の子供を対象としていません。13歳未満の子供から個人情報を意図的に収集することはありません。保護者の方で、子供が個人情報を提供したと思われる場合はお問い合わせください。' },
      { heading: '7. ポリシーの変更', content: 'このプライバシーポリシーは随時更新される場合があります。変更については、このページに新しいプライバシーポリシーを投稿し、「最終更新日」を更新することで通知します。' },
      { heading: '8. お問い合わせ', content: 'このプライバシーポリシーについてのご質問は、support@universepulse.net までお問い合わせください。' }
    ]
  },
  terms: {
    title: '利用規約',
    description: 'UniversePulse の利用条件。',
    updated: '最終更新日：2026年9月4日',
    contact: 'これらの規約についてのご質問は、までお問い合わせください。',
    sections: [
      { heading: '1. 規約の受諾', content: 'UniversePulse にアクセスし、使用することで、あなたは本利用規約に拘束されることに同意したものとみなされます。これらの規約に同意しない場合は、本サービスを使用しないでください。' },
      { heading: '2. サービスの説明', content: 'UniversePulse は、国連経済社会局（UN DESA）、国際エネルギー機関（IEA）、BP、FAO などの権威ある出所の年間平均に基づいたリアルタイムの全球データ見積りを提供します。表示されるすべての値は、教育および情報提供を目的とした数学的な近似値であり、正確なリアルタイム測定値を表すものではありません。' },
      { heading: '3. データ正確性の免責', content: 'UniversePulse で提示されるデータは、年間平均率を1秒あたりの見積りに変換したものです。権威ある出所を使用していますが、すべての値は近似値です。UniversePulse はデータの正確性、完全性、または時宜性についていかなる保証もしません。ユーザーは、一次出所を確認せずに特定の目的でデータを依存してはなりません。' },
      { heading: '4. 知的財産', content: 'テキスト、グラフィック、ロゴ、デザイン要素を含む UniversePulse のすべてのコンテンツは、UniversePulse またはそのライセンス提供者の財産であり、著作権およびその他の知的財産法によって保護されています。' },
      { heading: '5. ユーザーの行動', content: 'UniversePulse を合法的な目的でのみ使用することに同意します。ソーシャルメディアや他のプラットフォームで当コンテンツへのリンクを共有することができます。明示的な許可なく、転売、再掲載、または商業目的での使用はできません。' },
      { heading: '6. 責任の制限', content: 'UniversePulse は、本サービスの使用または使用不能に起因するいかなる間接的、付随的、特別、結果的、または懲罰的損害についても責任を負いません。提供されるデータは教育目的のみであり、科学的、金融的、またはその他の専門的な決定に使用してはなりません。' },
      { heading: '7. 規約の変更', content: '当社はいつでも本規約を変更する権利を留保します。変更後に本サービスを引き続き使用することは、新しい規約を受け入れたものとみなされます。' },
      { heading: '8. 準拠法', content: '本規約は、法衝突の原則に関係なく、適用される法に準拠して解釈されるものとします。' }
    ]
  },
  about: {
    title: 'UniversePulse について',
    description: 'グローバルデータをパーソナライズし、アクセス可能にするという使命。',
    intro: 'UniversePulse は、抽象的なマクロレベルの統計データを深く個人的で感情的に共鳴する体験に変換するリアルタイムの全球データダッシュボードです。グローバル人口、資源消費、環境変化を理解することは、すべての個人にとってアクセス可能で、美しく、意味のあるものであるべきだと私たちは信じています。',
    mission: '私たちの使命は、地球のすべての人が自分自身のグローバルシステムにおける位置を理解する手助けをすることです——受動的な観察者ではなく、人類と私たちの惑星の継続的な物語における積極的な参加者として。生年月日を入力すると、グローバル変化の背後にある数字があなたの数字でもあることに気づきます。',
    data: 'UniversePulse のすべてのデータは、国連経済社会局（UN DESA）、国際エネルギー機関（IEA）、BP 統計レビュー、FAO、グローバルカーボンプロジェクトなどの権威ある年間出所から来ています。年間合計は数学的モデルを使用して1秒あたりの平均率に変換されます。これらは教育表示のための見積りであり、正確な測定値ではありません。',
    team: 'UniversePulse は、Next.js、TypeScript、Tailwind CSS を使用して構築された独立したプロジェクトです。私たちはデータ可視化、気候意識、そして複雑な全球統計を誰もがアクセス可能にすることに情熱を持つ小さなチームです。',
    contact: 'あなたからの連絡をお待ちしています。連絡先：'
  },
  contact: {
    title: 'お問い合わせ',
    description: 'UniversePulse チームにご連絡ください。',
    intro: 'ご質問、ご提案、フィードバックがありますか？お闻かせください。最適な連絡方法はメールです。',
    methods: '現在、営業日中にすべてのメールに48時間以内に返信しています。緊急の場合は件名に"緊急"と記載してください。',
    email: 'メール',
    response: '返信時間',
    responseTime: '営業日（月～金、祝日除く）中にすべてのお問い合わせに48時間以内に対応することを目指しています。'
  }
};

const legalES = {
  back: '← Volver al Inicio',
  privacy: {
    title: 'Política de Privacidad',
    description: 'Cómo UniversePulse recopila y usa tus datos.',
    updated: 'Última actualización: 4 de septiembre de 2026',
    contact: 'Si tienes preguntas sobre esta Política de Privacidad, contáctanos en',
    sections: [
      { heading: '1. Información que Recopilamos', content: 'UniversePulse no recopila, almacena ni vende ningún dato personal. No utilizamos cookies de seguimiento ni mantenemos cuentas de usuario. El único dato que procesamos es la fecha de nacimiento que ingresas voluntariamente en la calculadora de cumpleaños, la cual se procesa completamente en tu navegador y nunca se transmite a nuestros servidores.' },
      { heading: '2. Cómo Usamos la Información', content: 'Dado que no recopilamos datos personales, no usamos ni procesamos ninguna información sobre ti. La fecha de nacimiento que ingresas se usa localmente en tu navegador para calcular estadísticas personales. Estos datos no se envían a ningún tercero.' },
      { heading: '3. Google Analytics', content: 'Utilizamos Google Analytics (gtag.js) para comprender cómo los visitantes interactúan con nuestro sitio. Google Analytics recopila información estándar de registros de internet y comportamiento de visitantes de forma anónima y agregada. No identifica a usuarios individuales. La política de privacidad de Google se aplica a los datos recopilados por sus servicios de análisis.' },
      { heading: '4. Seguridad de los Datos', content: 'Dado que no recopilamos datos personales, no hay datos personales que proteger. Todos los cálculos se realizan en el lado del cliente en tu navegador. Utilizamos HTTPS para proteger la conexión entre tu navegador y nuestros servidores.' },
      { heading: '5. Servicios de Terceros', content: 'Utilizamos Google Analytics para análisis del sitio. Al usar nuestro sitio, consientes la recopilación y uso de información por Google Analytics según se describe en su política de privacidad: https://policies.google.com/privacy' },
      { heading: '6. Privacidad de Menores', content: 'UniversePulse no está dirigido a niños menores de 13 años. No recopilamos deliberadamente información personal de menores de 13 años. Si eres padre y crees que tu hijo nos ha proporcionado información personal, contáctanos.' },
      { heading: '7. Cambios en esta Política', content: 'Podemos actualizar esta Política de Privacidad de vez en cuando. Te notificaremos sobre cualquier cambio publicando la nueva Política de Privacidad en esta página y actualizando la fecha de "Última actualización".' },
      { heading: '8. Contáctanos', content: 'Si tienes alguna pregunta sobre esta Política de Privacidad, contáctanos en support@universepulse.net.' }
    ]
  },
  terms: {
    title: 'Términos de Servicio',
    description: 'Términos y condiciones para usar UniversePulse.',
    updated: 'Última actualización: 4 de septiembre de 2026',
    contact: 'Si tienes preguntas sobre estos Términos, contáctanos en',
    sections: [
      { heading: '1. Aceptación de los Términos', content: 'Al acceder y usar UniversePulse, aceptas y aceptas estar sujeto a estos Términos de Servicio. Si no estás de acuerdo con estos términos, por favor no uses nuestro servicio.' },
      { heading: '2. Descripción del Servicio', content: 'UniversePulse proporciona estimaciones globales en tiempo real basadas en promedios anuales de fuentes autorizadas como UN DESA, IEA, BP y FAO. Todos los valores mostrados son aproximaciones matemáticas con fines educativos e informativos, y no representan mediciones precisas en tiempo real.' },
      { heading: '3. Descargo de Responsabilidad de Precisión de Datos', content: 'Los datos presentados en UniversePulse se derivan de tasas promedio anuales convertidas a estimaciones por segundo. Aunque usamos fuentes autorizadas, todos los valores son aproximaciones. UniversePulse no otorga garantías sobre la precisión, integridad u oportunidad de los datos. Los usuarios no deben depender de los datos para ningún propósito específico sin verificar contra las fuentes primarias.' },
      { heading: '4. Propiedad Intelectual', content: 'Todo el contenido en UniversePulse, incluyendo texto, gráficos, logotipos y elementos de diseño, es propiedad de UniversePulse o sus licenciadores y está protegido por leyes de derechos de autor y otras leyes de propiedad intelectual.' },
      { heading: '5. Conducta del Usuario', content: 'Aceptas usar UniversePulse solo para propósitos legales. Puedes compartir enlaces a nuestro contenido en redes sociales y otras plataformas. No puedes revender, republicar o usar nuestro contenido con fines comerciales sin permiso explícito.' },
      { heading: '6. Limitación de Responsabilidad', content: 'UniversePulse no será responsable por ningún daño indirecto, incidental, especial, consequencial o punitivo que surja de tu uso o incapacidad de usar el servicio. Los datos proporcionados son solo para fines educativos y no deben usarse para decisiones científicas, financieras u otras profesionales.' },
      { heading: '7. Cambios en los Términos', content: 'Nos reservamos el derecho de modificar estos Términos en cualquier momento. El uso continuado del servicio después de los cambios constituye aceptación de los nuevos Términos.' },
      { heading: '8. Ley Aplicable', content: 'Estos Términos se regirán e interpretarán de acuerdo con la ley aplicable, sin considerar principios de conflicto de leyes.' }
    ]
  },
  about: {
    title: 'Acerca de UniversePulse',
    description: 'Nuestra misión de hacer los datos globales personales y accesibles.',
    intro: 'UniversePulse es un panel de datos globales en tiempo real que transforma estadísticas macroabstractas en experiencias profundamente personales y emocionalmente significativas. Creemos que entender la población global, el consumo de recursos y el cambio ambiental debe ser accesible, hermoso y significativo para cada individuo.',
    mission: 'Nuestra misión es ayudar a cada persona en la Tierra a entender su lugar en el sistema global — no como un observador pasivo, sino como un participante activo en la historia continua de la humanidad y nuestro planeta. Cuando ingresas tu fecha de nacimiento, descubres que los números detrás del cambio global también son tus números.',
    data: 'Todos los datos en UniversePulse provienen de fuentes anuales autorizadas incluyendo el Departamento de Asuntos Económicos y Sociales de la ONU (UN DESA), la Agencia Internacional de Energía (IEA), el Resumen Estadístico de BP, la FAO y el Proyecto Carbono Global. Los totales anuales se convierten a tasas promedio por segundo usando modelos matemáticos. Estas son estimaciones para exhibición educativa, no mediciones precisas.',
    team: 'UniversePulse es un proyecto independiente construido con Next.js, TypeScript y Tailwind CSS. Somos un pequeño equipo apasionado por la visualización de datos, la conciencia climática y hacer que las estadísticas globales complejas sean accesibles para todos.',
    contact: 'Nos encantaría saber de ti. Contáctanos en'
  },
  contact: {
    title: 'Contáctanos',
    description: 'Ponte en contacto con el equipo de UniversePulse.',
    intro: '¿Tienes una pregunta, sugerencia o retroalimentación? Nos encantaría saber de ti. La mejor manera de contactarnos es por correo electrónico.',
    methods: 'Actualmente respondemos todos los correos electrónicos dentro de las 48 horas en días laborables. Para asuntos urgentes, por favor menciona "URGENTE" en la línea de asunto.',
    email: 'Correo Electrónico',
    response: 'Tiempo de Respuesta',
    responseTime: 'Nos esforzamos por responder a todas las consultas dentro de las 48 horas durante días laborables (lunes a viernes, excluyendo festivos).'
  }
};

const legalAR = {
  back: 'العودة إلى الصفحة الرئيسية ←',
  privacy: {
    title: 'سياسة الخصوصية',
    description: 'كيف يجمع UniversePulse بياناتك ويستخدمها.',
    updated: 'آخر تحديث: 4 سبتمبر 2026',
    contact: 'إذا كان لديك أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا على',
    sections: [
      { heading: '١. المعلومات التي نجمعها', content: 'لا يجمع UniversePulse أو يخزن أو يبيع أي بيانات شخصية. لا نستخدم ملفات تعريف الارتباط للتتبع، ولا ندير حسابات مستخدمين. البيانات الوحيدة التي نعالجها هي تاريخ ميلاد الذي تدخله طوعاً في حاسبة عيد الميلاد، والذي تتم معالجته بالكامل في متصفحك ولا يتم نقله إلى خوادمنا أبداً.' },
      { heading: '٢. كيف نستخدم المعلومات', content: 'بما أننا لا نجمع بيانات شخصية، فلا نستخدم أو نعالج أي معلومات عنك. تاريخ ميلادك الذي تدخله يُستخدم محلياً في متصفحك لحساب الإحصائيات الشخصية. لا يتم إرسال هذه البيانات إلى أي طرف ثالث.' },
      { heading: '٣. Google Analytics', content: 'نستخدم Google Analytics (gtag.js) لفهم تفاعل الزوار مع موقعنا. تجمع Google Analytics معلومات سجلات الإنترنت القياسية ومعلومات سلوك الزوار بشكل مجهول ومجمع. لا تحدد هوية المستخدمين الأفراد. تنطبق سياسة خصوصية Google على البيانات التي تجمعها خدماتها التحليلية.' },
      { heading: '٤. أمن البيانات', content: 'بما أننا لا نجمع بيانات شخصية، فلا توجد بيانات شخصية تحتاج إلى حماية. جميع الحسابات تحدث في جانب العميل في متصفحك. نستخدم HTTPS لحماية الاتصال بين متصفحك وخوادمنا.' },
      { heading: '٥. خدمات الأطراف الثالثة', content: 'نستخدم Google Analytics لتحليلات الموقع. باستخدام موقعنا، فإنك توافق على جمع واستخدام المعلومات بواسطة Google Analytics كما هو موضح في سياسة الخصوصية الخاصة بهم: https://policies.google.com/privacy' },
      { heading: '٦. خصوصية الأطفال', content: 'UniversePulse ليس مخصصاً للأطفال دون سن 13 عاماً. لا نجمع عمداً معلومات شخصية من الأطفال دون سن 13 عاماً. إذا كنت والد وترى أن طفلك قد قدم لنا معلومات شخصية، يرجى التواصل معنا.' },
      { heading: '٧. التغييرات على هذه السياسة', content: 'قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنبلغك بأي تغييرات من خلال نشر سياسة الخصوصية الجديدة على هذه الصفحة وتحديث تاريخ "آخر تحديث".' },
      { heading: '٨. تواصل معنا', content: 'إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا على support@universepulse.net.' }
    ]
  },
  terms: {
    title: 'شروط الخدمة',
    description: 'الشروط والأحكام لاستخدام UniversePulse.',
    updated: 'آخر تحديث: 4 سبتمبر 2026',
    contact: 'إذا كان لديك أسئلة حول هذه الشروط، يرجى التواصل معنا على',
    sections: [
      { heading: '١. قبول الشروط', content: 'بالوصول إلى UniversePulse واستخدامه، فإنك تقبل وتوافق على أن تكون مقيداً بهذه الشروط والأحكام. إذا لم توافق على هذه الشروط، يرجى عدم استخدام خدمتنا.' },
      { heading: '٢. وصف الخدمة', content: 'يقدم UniversePulse تقديرات بيانات عالمية في الوقت الفعلي بناءً على المتوسطات السنوية من مصادر موثوقة مثل UN DESA وIEA وBP وFAO. جميع القيم المعروضة هي تقريبات رياضية لأغراض تعليمية وإعلامية فقط، ولا تمثل قياسات دقيقة في الوقت الفعلي.' },
      { heading: '٣. إخلاء مسؤولية دقة البيانات', content: 'البيانات المعروضة على UniversePulse مستمدة من متوسطات سنوية محولة إلى تقديرات في الثانية. على الرغم من استخدام مصادر موثوقة، فإن جميع القيم تقريبية. لا يقدم UniversePulse أي ضمانات حول دقة أو اكتمال أو حداثة البيانات. لا ينبغي للمستخدمين الاعتماد على البيانات لأي غرض محدد دون التحقق منها من المصادر الأولية.' },
      { heading: '٤. الملكية الفكرية', content: 'جميع المحتويات على UniversePulse، بما في ذلك النص والرسومات والشعارات وعناصر التصميم، هي ممتلكات UniversePulse أو مرخصيها ومحمية بقوانين حقوق النشر والملكية الفكرية الأخرى.' },
      { heading: '٥. سلوك المستخدم', content: 'تتفق على استخدام UniversePulse للأغراض القانونية فقط. يمكنك مشاركة روابط لمحتوانا على وسائل التواصل الاجتماعي والمنصات الأخرى. لا يجوز لك إعادة البيع أو إعادة النشر أو استخدام محتوانا لأغراض تجارية دون إذن صريح.' },
      { heading: '٦. limitation of Liability', content: 'لا يتحمل UniversePulse أي مسؤولية عن أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية أو عقابية ناشئة عن استخدامك أو عجزك عن استخدام الخدمة. البيانات المقدمة هي لأغراض تعليمية فقط ولا ينبغي استخدامها للقرارات العلمية أو المالية أو المهنية الأخرى.' },
      { heading: '٧. التغييرات على الشروط', content: 'نحتفظ بالحق في تعديل هذه الشروط في أي وقت. الاستخدام المستمر للخدمة بعد التغييرات يشكل قبولاً للشروط الجديدة.' },
      { heading: '٨. القانون الواجب التطبيق', content: 'تخضع هذه الشروط وتُفسر وفقاً للقانون aplicable، دون النظر إلى مبادئ تعارض القوانين.' }
    ]
  },
  about: {
    title: 'حول UniversePulse',
    description: 'مهمتنا لجعل البيانات العالمية شخصية وسهلة الوصول.',
    intro: 'UniversePulse هو لوحة بيانات عالمية في الوقت الفعلي تحول الإحصاءات المجردة على المستوى الكلي إلى تجارب شخصية وعاطفية عميقة. نؤمن بأن فهم تعداد السكان العالميين واستهلاك الموارد والتغير البيئي يجب أن يكون في متناول الجميع وجميلاً ومهماً لكل فرد.',
    mission: 'مهمتنا هي مساعدة كل شخص على الأرض على فهم مكانه في النظام العالمي - ليس كمتفرج سلبي، بل كطرف مشارك نشط في قصة البشرية وكوكبنا المستمرة. عندما تدخل تاريخ ميلادك، تكتشف أن الأرقام وراء التغيير العالمي هي أيضاً أرقامك.',
    data: 'جميع البيانات على UniversePulse来源于 مصادر سنوية موثوقة بما في ذلك قسم الشؤون الاقتصادية والاجتماعية التابع للأمم المتحدة (UN DESA) والوكالة الدولية للطاقة (IEA) واستعراض BP الإحصائي ومنظمة FAO ومشروع الكربون العالمي. يتم تحويل المجاميع السنوية إلى متوسطات في الثانية باستخدام النماذج الرياضية. هذه تقديرات للعرض التعليمي وليست قياسات دقيقة.',
    team: 'UniversePulse هو مشروع مستقل مبني باستخدام Next.js وTypeScript وTailwind CSS. نحن فريق صغير شغوف بتصوير البيانات والوعي المناخي وجعل الإحصاءات العالمية المعقدة في متناول الجميع.',
    contact: 'يسعدنا أن نسمع منك. تواصل معنا على'
  },
  contact: {
    title: 'تواصل معنا',
    description: 'تواصل مع فريق UniversePulse.',
    intro: 'لديك سؤال أو اقتراح أو ملاحظات؟ يسعدنا أن نسمع منك. أفضل طريقة للتواصل معنا هي عبر البريد الإلكتروني.',
    methods: 'نرد حالياً على جميع رسائل البريد الإلكتروني خلال 48 ساعة في أيام العمل. للمسائل العاجلة، يرجى ذكر "عاجل" في سطر الموضوع.',
    email: 'البريد الإلكتروني',
    response: 'وقت الرد',
    responseTime: 'نهدف إلى الرد على جميع الاستفسارات خلال 48 ساعة خلال أيام العمل (من الاثنين إلى الجمعة، باستثناء العطلات).'
  }
};

const legalFR = {
  back: '← Retour à l\'accueil',
  privacy: {
    title: 'Politique de Confidentialité',
    description: 'Comment UniversePulse collecte et utilise vos données.',
    updated: 'Dernière mise à jour : 4 septembre 2026',
    contact: 'Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter à',
    sections: [
      { heading: '1. Informations que nous collectons', content: 'UniversePulse ne collecte, ne stocke ni ne vend aucune donnée personnelle. Nous n\'utilisons pas de cookies de suivi et ne tenons pas de comptes utilisateur. La seule donnée que nous traitons est la date de naissance que vous saisissez volontairement dans la calculatrice d\'anniversaire, laquelle est traitée entièrement dans votre navigateur et jamais transmise à nos serveurs.' },
      { heading: '2. Comment nous utilisons les informations', content: 'Comme nous ne collectons pas de données personnelles, nous n\'utilisons ni ne traitons aucune information vous concernant. La date de naissance que vous saisissez est utilisée localement dans votre navigateur pour calculer des statistiques personnelles. Ces données ne sont pas envoyées à des tiers.' },
      { heading: '3. Google Analytics', content: 'Nous utilisons Google Analytics (gtag.js) pour comprendre comment les visiteurs interagissent avec notre site. Google Analytics collecte des informations standard de journaux Internet et des informations sur le comportement des visiteurs sous une forme anonyme et agrégée. Il n\'identifie pas les utilisateurs individuels. La politique de confidentialité de Google s\'applique aux données collectées par ses services d\'analyse.' },
      { heading: '4. Sécurité des données', content: 'Comme nous ne collectons pas de données personnelles, il n\'y a pas de données personnelles à sécuriser. Tous les calculs sont effectués côté client dans votre navigateur. Nous utilisons HTTPS pour protéger la connexion entre votre navigateur et nos serveurs.' },
      { heading: '5. Services tiers', content: 'Nous utilisons Google Analytics pour les analyses de site. En utilisant notre site, vous consentez à la collecte et à l\'utilisation des informations par Google Analytics comme décrit dans leur politique de confidentialité : https://policies.google.com/privacy' },
      { heading: '6. Confidentialité des enfants', content: 'UniversePulse n\'est pas destiné aux enfants de moins de 13 ans. Nous ne collectons pas sciemment d\'informations personnelles auprès d\'enfants de moins de 13 ans. Si vous êtes un parent et pensez que votre enfant nous a fourni des informations personnelles, veuillez nous contacter.' },
      { heading: '7. Modifications de cette politique', content: 'Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Nous vous informerons de tout changement en publiant la nouvelle politique de confidentialité sur cette page et en mettant à jour la date de "Dernière mise à jour".' },
      { heading: '8. Nous contacter', content: 'Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter à support@universepulse.net.' }
    ]
  },
  terms: {
    title: 'Conditions d\'Utilisation',
    description: 'Conditions générales d\'utilisation de UniversePulse.',
    updated: 'Dernière mise à jour : 4 septembre 2026',
    contact: 'Si vous avez des questions concernant ces conditions, veuillez nous contacter à',
    sections: [
      { heading: '1. Acceptation des conditions', content: 'En accédant et en utilisant UniversePulse, vous acceptez et convenez d\'être lié par ces conditions d\'utilisation. Si vous n\'êtes pas d\'accord avec ces conditions, veuillez ne pas utiliser notre service.' },
      { heading: '2. Description du service', content: 'UniversePulse fournit des estimations mondiales en temps réel basées sur des moyennes annuelles de sources autorisées telles que le Département des affaires économiques et sociales de l\'ONU (UN DESA), l\'Agence internationale de l\'énergie (AIE), BP et la FAO. Toutes les valeurs affichées sont des approximations mathématiques à des fins éducatives et informatives uniquement, et ne représentent pas des mesures précises en temps réel.' },
      { heading: '3. Clause de non-responsabilité sur l\'exactitude des données', content: 'Les données présentées sur UniversePulse sont dérivées de taux moyens annuels convertis en estimations par seconde. Bien que nous utilisions des sources autorisées, toutes les valeurs sont des approximations. UniversePulse ne fournit aucune garantie concernant l\'exactitude, l\'intégrité ou l\'actualité des données. Les utilisateurs ne doivent pas s\'appuyer sur les données à des fins spécifiques sans les vérifier par rapport aux sources primaires.' },
      { heading: '4. Propriété intellectuelle', content: 'Tout le contenu sur UniversePulse, y compris les textes, graphiques, logos et éléments de design, est la propriété de UniversePulse ou de ses concédants de licence et est protégé par les lois sur le droit d\'auteur et autres lois sur la propriété intellectuelle.' },
      { heading: '5. Conduite de l\'utilisateur', content: 'Vous acceptez d\'utiliser UniversePulse uniquement à des fins légales. Vous pouvez partager des liens vers notre contenu sur les réseaux sociaux et d\'autres plateformes. Vous ne pouvez pas revendre, republier ou utiliser notre contenu à des fins commerciales sans permission explicite.' },
      { heading: '6. Limitation de responsabilité', content: 'UniversePulse ne saurait être tenu responsable de tout dommage indirect, accessoire, spécial, consécutif ou punitif résultant de votre utilisation ou de votre incapacité à utiliser le service. Les données fournies sont uniquement à des fins éducatives et ne doivent pas être utilisées pour des décisions scientifiques, financières ou autres professionnelles.' },
      { heading: '7. Modifications des conditions', content: 'Nous nous réservons le droit de modifier ces conditions à tout moment. L\'utilisation continue du service après les modifications constitue une acceptation des nouvelles conditions.' },
      { heading: '8. Droit applicable', content: 'Ces conditions sont régies et interprétées conformément au droit applicable, sans égard aux principes de conflit de lois.' }
    ]
  },
  about: {
    title: 'À propos de UniversePulse',
    description: 'Notre mission de rendre les données mondiales personnelles et accessibles.',
    intro: 'UniversePulse est un tableau de bord mondial en temps réel qui transforme des statistiques macro-abstraites en expériences profondément personnelles et émotionnellement significatives. Nous croyons que comprendre la population mondiale, la consommation de ressources et les changements environnementaux devrait être accessible, beau et significatif pour chaque individu.',
    mission: 'Notre mission est d\'aider chaque personne sur Terre à comprendre sa place dans le système mondial — non pas comme un observateur passif, mais comme un participant actif dans l\'histoire continue de l\'humanité et de notre planète. Lorsque vous entrez votre date de naissance, vous découvrez que les chiffres derrière le changement mondial sont aussi vos chiffres.',
    data: 'Toutes les données sur UniversePulse proviennent de sources annuelles autorisées incluant le Département des affaires économiques et sociales de l\'ONU (UN DESA), l\'Agence internationale de l\'énergie (AIE), le Résumé statistique de BP, la FAO et le Project Carbone Mondial. Les totaux annuels sont convertis en taux moyens par seconde à l\'aide de modèles mathématiques. Il s\'agit d\'estimations à des fins éducatives, et non de mesures précises.',
    team: 'UniversePulse est un projet indépendant construit avec Next.js, TypeScript et Tailwind CSS. Nous sommes une petite équipe passionnée par la visualisation de données, la conscience climatique et la rendre accessible à tous.',
    contact: 'Nous serions ravis de vous entendre. Contactez-nous à'
  },
  contact: {
    title: 'Contactez-nous',
    description: 'Entrez en contact avec l\'équipe UniversePulse.',
    intro: 'Une question, une suggestion ou un retour ? Nous serions ravis de vous entendre. Le meilleur moyen de nous contacter est par e-mail.',
    methods: 'Nous répondons actuellement à tous les e-mails dans les 48 heures les jours ouvrables. Pour les affaires urgentes, veuillez mentionner "URGENT" dans l\'objet.',
    email: 'E-mail',
    response: 'Délai de réponse',
    responseTime: 'Nous visons à répondre à toutes les demandes dans les 48 heures durant les jours ouvrables (lundi-vendredi, hors jours fériés).'
  }
};

const translations = { zh: legalZH, ja: legalJA, es: legalES, ar: legalAR, fr: legalFR };

files.forEach(locale => {
  const path = 'd:/VScode/UniversePulse/messages/' + locale + '.json';
  let data = JSON.parse(fs.readFileSync(path, 'utf8'));
  data.legal = translations[locale];
  fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log('Updated ' + locale + '.json with full translations');
});
