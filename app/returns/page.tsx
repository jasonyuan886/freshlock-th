import { Metadata } from 'next';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://th.freshlocksealer.com/returns',
  },
};


export const metadata: Metadata = {
  title: 'นโยบายการคืนสินค้าและคืนเงิน — รับประกันความพึงพอใจ 7 วัน',
  description:
    'FreshLock มีการรับประกันความพึงพอใจ 7 วัน คืนสินค้าที่ยังไม่ได้ใช้ภายใน 7 วันเพื่อขอคืนเงินหรือเปลี่ยนสินค้า รับประกัน 1 ปีสำหรับตัวเครื่อง',
};

export default function ReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <h1 className="section-title">นโยบายการคืนสินค้าและคืนเงิน</h1>
        <p className="section-subtitle">รับประกันความพึงพอใจ 7 วัน — สนับสนุนโดยการรับประกัน 1 ปี</p>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="bg-white rounded-xl p-8 shadow-sm space-y-6">
          <section>
            <div className="bg-accent/10 border-l-4 border-accent p-4 rounded">
              <p className="text-gray-900 font-semibold">
                🎉 รับประกันความพึงพอใจ 7 วัน — หากคุณไม่พอใจอย่างยิ่งกับการซื้อ FreshLock ภายใน 7 วันหลังจากได้รับสินค้า เราจะแก้ไขให้
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">1. ระยะเวลาการคืนสินค้า (เปลี่ยนใจ)</h2>
            <p className="text-gray-600 leading-relaxed">
              คุณสามารถคืนสินค้าใหม่ที่ยังไม่ได้ใช้ภายใน <strong>7 วันหลังจากได้รับสินค้า</strong> เพื่อขอคืนเงินเต็มจำนวนหรือเปลี่ยนสินค้า โดยไม่ต้องอธิบายเหตุผล สินค้าต้องอยู่ในบรรจุภัณฑ์เดิม ไม่เสียหาย และอยู่ในสภาพที่ขายได้ พร้อมอุปกรณ์เสริมและเอกสารทั้งหมด
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">2. เงื่อนไขการคืนสินค้า</h2>
            <p className="text-gray-600 leading-relaxed mb-3">เพื่อมีสิทธิ์คืนสินค้ากรณีเปลี่ยนใจ:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>คำขอคืนสินค้าต้องเริ่มภายใน 7 วันหลังจากได้รับสินค้า</li>
              <li>สินค้าต้องไม่ได้ใช้ ไม่เสียหาย และอยู่ในบรรจุภัณฑ์เดิม</li>
              <li>อุปกรณ์เสริมทั้งหมด (สายชาร์จ คู่มือ ถุงที่แถม ฯลฯ) ต้องรวมอยู่ด้วย</li>
              <li>ต้องมีหลักฐานการซื้อ (หมายเลขคำสั่งซื้อ)</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              <strong>สินค้าที่ไม่สามารถคืนได้:</strong> ถุงซีลสูญญากาศที่เปิดหรือใช้แล้ว (ด้วยเหตุผลด้านสุขอนามัย) สินค้าที่ระบุว่าขายครั้งสุดท้าย และสินค้าที่เสียหายจากการใช้ผิดวิธี อุบัติเหตุ หรือการดัดแปลงโดยไม่ได้รับอนุญาต
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">3. วิธีเริ่มการคืนสินค้า</h2>
            <ol className="list-decimal pl-6 space-y-3 text-gray-600">
              <li><strong>ส่งอีเมลถึงเรา</strong> ที่ <a href="mailto:support@freshlocksealer.com" className="text-accent hover:underline">support@freshlocksealer.com</a> พร้อมหมายเลขคำสั่งซื้อ สินค้าที่ต้องการคืน และเหตุผล</li>
              <li><strong>รับการอนุมัติ:</strong> เราจะตรวจสอบคำขอของคุณและตอบกลับภายใน 1–2 วันทำการ พร้อมหมายเลขอนุญาตคืนสินค้า (RMA) และที่อยู่สำหรับส่งคืน การส่งคืนโดยไม่มีหมายเลข RMA อาจล่าช้าหรือถูกปฏิเสธ</li>
              <li><strong>ส่งสินค้ากลับ:</strong> บรรจุสินค้าให้แน่นหนาในบรรจุภัณฑ์เดิมและส่งไปยังที่อยู่ที่เราให้ เราแนะนำให้ใช้บริการจัดส่งที่ติดตามได้</li>
              <li><strong>ตรวจสอบและคืนเงิน:</strong> เมื่อเราได้รับและตรวจสอบสินค้าที่คืน (ปกติภายใน 5 วันทำการ) เราจะดำเนินการคืนเงินหรือเปลี่ยนสินค้าให้</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">4. ค่าจัดส่งคืนสินค้า</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li><strong>การคืนกรณีเปลี่ยนใจ:</strong> คุณรับผิดชอบค่าจัดส่งคืน ค่าจัดส่งขาออกเดิมไม่สามารถคืนได้ เว้นแต่การคืนเกิดจากความผิดพลาดของเรา</li>
              <li><strong>สินค้าที่ชำรุด เสียหาย หรือไม่ถูกต้อง:</strong> หากสินค้าที่ส่งมามีข้อบกพร่อง เสียหาย หรือไม่ใช่สิ่งที่คุณสั่ง เราจะรับผิดชอบค่าจัดส่งคืนทั้งหมดและให้ฉลากส่งคืนแบบชำระล่วงหน้า — เพียงติดต่อเราภายใน 14 วันหลังจากได้รับสินค้าพร้อมรูปภาพปัญหา</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">5. ระยะเวลาคืนเงิน</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              เมื่อการคืนสินค้าของคุณได้รับการอนุมัติและตรวจสอบแล้ว เงินคืนจะถูกโอนไปยังวิธีการชำระเงินเดิมของคุณ เวลาดำเนินการโดยทั่วไป:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li><strong>บัตรเครดิต/เดบิต:</strong> 5–10 วันทำการเพื่อแสดงในรายการ (ขึ้นอยู่กับผู้ออกบัตร)</li>
              <li><strong>PayPal:</strong> 3–5 วันทำการ</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">6. การเปลี่ยนสินค้า</h2>
            <p className="text-gray-600 leading-relaxed">
              หากคุณต้องการเปลี่ยนสินค้าเป็นผลิตภัณฑ์ สี หรือชุดอื่น โปรดระบุในอีเมลของคุณ การเปลี่ยนสินค้าขึ้นอยู่กับความพร้อมของสต็อก หากสินค้าทดแทนมีราคาสูงกว่า คุณจะต้องจ่ายส่วนต่าง หากราคาต่ำกว่า เราจะคืนส่วนต่างให้
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">7. สินค้าที่ชำรุด เสียหาย หรือไม่ถูกต้อง</h2>
            <p className="text-gray-600 leading-relaxed">
              หากคุณได้รับสินค้าที่ชำรุด เสียหาย หรือไม่ถูกต้อง โปรดติดต่อเราภายใน <strong>14 วันหลังจากได้รับสินค้า</strong> ที่ <a href="mailto:support@freshlocksealer.com" className="text-accent hover:underline">support@freshlocksealer.com</a> พร้อมหมายเลขคำสั่งซื้อและรูปภาพที่ชัดเจนของปัญหา เราจะจัดการเปลี่ยน ซ่อม หรือคืนเงินเต็มจำนวนโดยไม่มีค่าใช้จ่ายเพิ่มเติม รวมถึงค่าจัดส่งคืน
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">8. การเคลมการรับประกัน</h2>
            <p className="text-gray-600 leading-relaxed">
              เครื่องสูญญากาศแบบพกพา FreshLock Pro มี <strong>รับประกัน 1 ปีสำหรับตัวเครื่อง</strong> และ <strong>รับประกัน 6 เดือนสำหรับอุปกรณ์เสริม</strong> (สาย USB-C ถุงเริ่มต้น) ต่อข้อบกพร่องในวัสดุและการผลิต การเคลมการรับประกันนอกระยะเวลาคืนสินค้า 7 วัน จะดำเนินการแยกต่างหาก — เพียงส่งอีเมลถึงเราพร้อมหมายเลขคำสั่งซื้อ คำอธิบายปัญหา และรูปภาพหรือวิดีโอถ้าเป็นไปได้ เราจะจัดการซ่อมหรือเปลี่ยนภายใต้การรับประกัน
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">9. สิทธิตามกฎหมายของคุณ</h2>
            <p className="text-gray-600 leading-relaxed">
              นโยบายการคืนสินค้าของเราไม่ได้ยกเว้น จำกัด หรือแก้ไขสิทธิตามกฎหมายที่ไม่อาจยกเว้นได้หรือวิธีการแก้ไขใดๆ ที่คุณอาจมีภายใต้กฎหมายคุ้มครองผู้บริโภคที่บังคับใช้ รวมถึงสิทธิของคุณในการซ่อม เปลี่ยน หรือคืนเงินสำหรับความล้มเหลวครั้งใหญ่และค่าชดเชยสำหรับความสูญเสียหรือความเสียหายอื่นๆ ที่สามารถคาดเดาได้อย่างสมเหตุสมผล
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">10. ติดต่อเรา</h2>
            <p className="text-gray-600 leading-relaxed">เพื่อเริ่มการคืนสินค้าหรือสอบถามเกี่ยวกับนโยบายของเรา:</p>
            <p className="text-gray-600 leading-relaxed mt-3">
              <strong>อีเมล:</strong> <a href="mailto:support@freshlocksealer.com" className="text-accent hover:underline">support@freshlocksealer.com</a><br />
              <strong>เวลาตอบกลับ:</strong> ภายใน 24 ชั่วโมงในวันทำการ (จันทร์–ศุกร์, 9โมง–5โมงเย็น ICT)
            </p>
          </section>

          <p className="text-sm text-gray-500 mt-8 pt-6 border-t">
            อัปเดตล่าสุด: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
  );
}
