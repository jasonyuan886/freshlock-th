import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'เกี่ยวกับ FreshLock — ป้องกันฟรีเซอร์เบิร์นด้วยเครื่องสูญญากาศแบบพกพา',
  description:
    'FreshLock ผลิตเครื่องสูญญากาศแบบไร้สาย กดปุ่มเดียว ออกแบบมาเพื่อป้องกันฟรีเซอร์เบิร์นและลดการสูญเสียอาหาร -60 kPa, USB-C, BPA-free, รับประกัน 1 ปี',
  alternates: {
    canonical: '/about',
    languages: {
      'en-US': 'https://www.freshlocksealer.com/about',
      'ja-JP': 'https://jp.freshlocksealer.com/about',
      'x-default': 'https://www.freshlocksealer.com/about',
    },
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="section-title">เกี่ยวกับ FreshLock</h1>
        <p className="section-subtitle">
          ช่วยให้ครัวเรือนลดการทิ้งอาหาร ประหยัดเงิน และทานอาหารที่สดใหม่กว่า — ทีละถุงสูญญากาศ
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">เรื่องราวของเรา</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            FreshLock เริ่มต้นจากข้อสังเกตง่ายๆ: อาหารดีๆ มากเกินไปถูกทิ้งไป ตั้งแต่อาหารเหลือจากมื้อค่ำ อาหารที่ทำเป็นชุดใหญ่ ผลผลิตตามฤดูกาล ไปจนถึงเนื้อสัตว์ที่หมักเตรียมไว้ ผู้คนทิ้งอาหารที่ดีเพราะมันเสียก่อนที่จะได้ทาน — แม้แต่ในตู้เย็นหรือช่องแช่แข็ง เนื่องจากฟรีเซอร์เบิร์น
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            เครื่องสูญญากาศแบบดั้งเดิมนั้นใหญ่ ต้องเสียบปลั๊ก และใช้แถบความร้อนที่เผาไหม้ถุง ทำให้กระบวนการดูน่ากลัว เราตั้งใจสร้างสิ่งที่ง่ายกว่า: เครื่องสูบลมสูญญากาศแบบพกพา ไร้สาย ที่ใช้กับถุงลายนูนมีวาล์ว เพียงกดหัวฉีดลงบนวาล์ว กดปุ่มเดียว แล้วดูลมหายไปในไม่กี่วินาที — ไม่มีความร้อน ไม่ยุ่งยาก ไม่เปลืองถุง
          </p>
          <p className="text-gray-600 leading-relaxed">
            ปัจจุบัน FreshLock ถูกใช้โดยพ่อครัวแม่ครัวทั่วโลก — พ่อแม่ที่ยุ่งทำอาหารเป็นชุดในช่วงสุดสัปดาห์ นักแคมป์ที่รักษาอาหารให้สดบนเส้นทาง และทุกคนที่ต้องการให้เงินซื้อของของตนยืนยาวขึ้น
          </p>
        </div>

        <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 rounded-xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">ออกแบบในเซินเจิ้น ได้รับความไว้วางใจทั่วโลก</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            FreshLock ถูกออกแบบ ผลิต และส่งโดย <strong>Shichiri Technology Co., Ltd. (深圳市七力科技有限公司)</strong> ทีมวิศวกรเครื่องใช้ในครัวที่ตั้งอยู่ในเซินเจิ้น — เมืองหลวงฮาร์ดแวร์ของโลก ที่ซัพพลายเชน นักออกแบบอุตสาหกรรม และวิศวกรอิเล็กทรอนิกส์ได้สร้างเครื่องมือที่ผู้คนใช้จริงทุกวันมาเป็นเวลาสี่ทศวรรษ
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            เราไม่เช่าสำนักงานปลอมในสหรัฐฯ หรือแสร้งทำเป็นสตาร์ทอัพจากแคลิฟอร์เนีย เราเป็นโรงงานจริง: ทีมเดียวกันที่ผลิตเครื่องใช้ในครัวให้แบรนด์ระดับนานาชาติที่มีชื่อเสียง ตอนนี้นำ FreshLock มาส่งตรงถึงคุณ — ไม่มีคนกลางเพิ่มราคา ไม่มีการตลาด "ออกแบบในซิลิคอนแวลลีย์" แค่เครื่องมือที่สร้างมาดีในราคาที่ยุติธรรม
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mt-6 text-sm">
            <div className="bg-white rounded-lg p-4 border border-gray-100">
              <p className="font-semibold text-primary mb-1">🏭 บริษัท</p>
              <p className="text-gray-600">Shichiri Technology Co., Ltd.</p>
              <p className="text-gray-500 text-xs mt-1">深圳市七力科技有限公司</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-100">
              <p className="font-semibold text-primary mb-1">📍 ที่อยู่</p>
              <p className="text-gray-600">3F, Building C, Anhongji Industrial Park, Chuangyi Road, Dalang Sub-district, Longhua District, Shenzhen, Guangdong, China</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-100">
              <p className="font-semibold text-primary mb-1">📧 ฝ่ายสนับสนุน</p>
              <p className="text-gray-600"><a href="mailto:support@freshlocksealer.com" className="text-accent hover:underline">support@freshlocksealer.com</a></p>
              <p className="text-gray-500 text-xs mt-1">ตอบกลับภายใน 24 ชั่วโมงทำการ</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-100">
              <p className="font-semibold text-primary mb-1">✅ การรับรอง</p>
              <p className="text-gray-600">CE · RoHS · FCC · BPA-free (ได้รับมาตรฐานสัมผัสอาหาร EU/US)</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">ผลิตภัณฑ์ของเรา</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            เครื่องสูญญากาศแบบพกพา FreshLock Pro ถูกสร้างมาสำหรับครัวจริง:
          </p>
          <ul className="space-y-2 text-gray-600 list-disc pl-6">
            <li><strong>ตัวเครื่องสีขาวมุก</strong> พร้อมฝาตัดเพชรโครเมียม แผงหน้ากากสีดำกึ่งโปร่งแสงพร้อมจอ LED สีฟ้า และปุ่มเปิดปิดสีเงิน — ขนาดพอดีกับลิ้นชักในครัว</li>
            <li><strong>กำลังดูด -60 kPa</strong> — แรงพอที่จะสูญญากาศได้แน่นในไม่กี่วินาทีโดยไม่ทำลายอาหาร</li>
            <li><strong>ถาดรองน้ำแบบถอดได้โปร่งใส</strong> (ป้องกันน้ำไหลกลับ) เพื่อให้ซุป น้ำหมัก และเนื้อสัตว์ที่มีน้ำซีลได้สะอาดโดยไม่ทำลายมอเตอร์</li>
            <li><strong>ชาร์จผ่าน USB-C</strong> แบตเตอรี่ 1200 mAh — ซีลได้ 80–100 ครั้งต่อการชาร์จ 1 ครั้ง ใช้เวลาชาร์จประมาณ 2.5 ชั่วโมง</li>
            <li><strong>เสียงต่ำกว่า 60 dB</strong> — เบาเหมือนในห้องสมุด</li>
            <li>ใช้ได้กับ <strong>ถุงลายนูนมีวาล์วส่วนใหญ่</strong> ไม่ใช่แค่ของเรา ถุงของเราเป็น PA+PE ลายนูน 90 μm ปลอด BPA พร้อมวาล์วอากาศวงกลมสีขาวและซิปสีเขียวแอปเปิ้ล</li>
          </ul>
          <p className="text-gray-600 leading-relaxed mt-4">
            <em>FreshLock เป็นระบบสูญญากาศแบบปั๊ม — ไม่ใช้แถบความร้อนหรือองค์ประกอบซีลความร้อน อากาศถูกดูดออกผ่านวาล์วทางเดียวบนถุง และซิปสไลเดอร์แทรคคู่ที่ใช้ซ้ำได้จะรักษาการซีลไว้</em>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: '🌱', title: 'ลดการสูญเสียอาหาร', text: 'การสูญญากาศยืดอายุอาหารในตู้เย็น ช่องแช่แข็ง และตู้อาหารได้ถึง 5 เท่า — ประหยัดอาหารและเงิน' },
            { icon: '🌍', title: 'จัดส่งฟรี $69+', text: 'จัดส่งฟรีสำหรับคำสั่งซื้อในไทยที่มียอดเกิน $69 คิทเริ่มต้นจัดส่งฟรีเสมอ อัตราจัดส่งระหว่างประเทศคำนวณที่หน้าชำระเงิน' },
            { icon: '♻️', title: 'ใช้ได้หลายแบบและนำกลับมาใช้ใหม่', text: 'ใช้ได้กับถุงลายนูนมีวาล์วส่วนใหญ่ ถุงสามารถล้างและนำกลับมาใช้ใหม่สำหรับของแห้งได้' },
          ].map((v) => (
            <div key={v.title} className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="text-4xl mb-3">{v.icon}</div>
              <h3 className="font-bold text-primary mb-2">{v.title}</h3>
              <p className="text-gray-600 text-sm">{v.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-primary mb-4">คำมั่นสัญญาของเรา</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">✓</span>
              <span><strong>รับประกันความพึงพอใจ 7 วัน</strong> — ไม่พอใจ ส่งคืนเพื่อขอคืนเงินเต็มจำนวน</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">✓</span>
              <span><strong>จัดส่งฟรี</strong> สำหรับคำสั่งซื้อในไทยที่มียอดเกิน $69 คิทเริ่มต้นจัดส่งฟรีเสมอ</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">✓</span>
              <span><strong>รับประกัน 1 ปี</strong> สำหรับตัวเครื่อง และ 6 เดือนสำหรับอุปกรณ์เสริม</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">✓</span>
              <span><strong>ฝ่ายสนับสนุนโดยคนจริง</strong> — อีเมล support@freshlocksealer.com ได้ตลอดเวลา ตอบกลับภายใน 24 ชั่วโมงในวันทำการ</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">✓</span>
              <span><strong>ปลอด BPA ได้รับมาตรฐาน FCC / CE / RoHS</strong> — วัสดุปลอดภัยสำหรับอาหารและอิเล็กทรอนิกส์ที่ผ่านการรับรอง</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
