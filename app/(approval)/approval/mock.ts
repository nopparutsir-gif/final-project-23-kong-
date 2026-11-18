// กำหนดว่าคำขอรออนุมัติและคำขอในหน่วยงานต้องมีข้อมูลอะไรบ้าง
interface PendingRequest {
  id: string;
  title: string;
  by: string;
  dept: string;
  date: string;
  priority: string;
  amount: string;
  category: string;
}

interface UnitRequest {
  id: string;
  title: string;
  by: string;
  dept: string;
  date: string;
  status: string;
  category: string;
  progress: number;
}

// ข้อมูลตัวอย่างสำหรับหน้ารายการ approval/page.tsx และหน้าพิจารณา approvalsView/page.tsx
export const PENDING: PendingRequest[] = [
  { id: "REQ-2611-014", title: "ขอจัดซื้อเครื่องพิมพ์ฉลากสำหรับคลังสินค้า", by: "สมชาย ใจดี", dept: "ฝ่ายคลังสินค้า", date: "10 พ.ย. 2569", priority: "ด่วน", amount: "48,500", category: "พัฒนาใหม่" },
  { id: "REQ-2611-012", title: "ขอปรับปรุงระบบรายงานยอดขายรายสัปดาห์", by: "วิภา รัตนชัย", dept: "ฝ่ายขาย", date: "9 พ.ย. 2569", priority: "ปกติ", amount: "120,000", category: "ปรับปรุง" },
  { id: "REQ-2611-009", title: "ขอเช่าพื้นที่จัดเก็บเอกสารเพิ่มเติม", by: "ประเสริฐ ศรีทอง", dept: "ฝ่ายบัญชี", date: "6 พ.ย. 2569", priority: "ปกติ", amount: "36,000", category: "แก้ปัญหา" },
];

// ข้อมูลตัวอย่างสำหรับสรุปใน approval/page.tsx และหน้ารวม/หน้ารายละเอียดใน unit/page.tsx กับ unit/unitView/page.tsx
export const IN_UNIT: UnitRequest[] = [
  { id: "REQ-2611-011", title: "ขออนุมัติฝึกอบรมความปลอดภัยในการทำงาน", by: "นภา อินทร์แก้ว", dept: "ฝ่ายผลิต", date: "8 พ.ย. 2569", status: "กำลังดำเนินการ", category: "พัฒนาใหม่", progress: 40 },
  { id: "REQ-2610-087", title: "ขอเปลี่ยนคอมพิวเตอร์ประจำโต๊ะ 5 เครื่อง", by: "ธนา วงศ์สว่าง", dept: "ฝ่ายขาย", date: "28 ต.ค. 2569", status: "อนุมัติแล้ว", category: "แก้ปัญหา", progress: 80 },
  { id: "REQ-2610-080", title: "ขอซื้อวัสดุสำนักงานประจำไตรมาส 4", by: "สมชาย ใจดี", dept: "ฝ่ายคลังสินค้า", date: "25 ต.ค. 2569", status: "เสร็จสิ้น", category: "ปรับปรุง", progress: 100 },
  { id: "REQ-2610-071", title: "ขอเพิ่มอัตรากำลังพนักงานชั่วคราว", by: "วิภา รัตนชัย", dept: "ฝ่ายขาย", date: "20 ต.ค. 2569", status: "ไม่อนุมัติ", category: "แก้ปัญหา", progress: 0 },
  { id: "REQ-2611-016", title: "ขอพัฒนาระบบจัดการคลังสินค้า", by: "กิตติ ศรีสุข", dept: "ฝ่ายคลังสินค้า", date: "15 พ.ย. 2569", status: "รออนุมัติ", category: "พัฒนาใหม่", progress: 20 },
  { id: "REQ-2611-013", title: "ขอปรับปรุงระบบบันทึกเวลาทำงาน", by: "อรทัย พูลเพิ่ม", dept: "ฝ่ายบุคคล", date: "12 พ.ย. 2569", status: "ส่งกลับแก้ไข", category: "ปรับปรุง", progress: 40 },
  { id: "REQ-2611-010", title: "ขอตรวจรับอุปกรณ์คอมพิวเตอร์", by: "ธนา วงศ์สว่าง", dept: "ฝ่ายขาย", date: "7 พ.ย. 2569", status: "รอตรวจรับ", category: "แก้ปัญหา", progress: 80 },
  { id: "REQ-2610-065", title: "ขอแก้ไขข้อผิดพลาดในระบบลงเวลา", by: "อรทัย พูลเพิ่ม", dept: "ฝ่ายบุคคล", date: "1 ต.ค. 2569", status: "เกินกำหนด", category: "แก้ bug", progress: 60 },
];
