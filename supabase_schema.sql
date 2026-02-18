-- Create students table
CREATE TABLE public.students (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT,
    age NUMERIC,
    tags TEXT[],
    status TEXT,
    timeout TEXT,
    current_task TEXT,
    stage TEXT,
    avatar TEXT,
    category TEXT, -- 'new', 'followup', 'visit'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all access for now (for development simplicity)
-- In production, you should restrict this.
CREATE POLICY "Enable all access for all users" ON public.students
FOR ALL USING (true) WITH CHECK (true);

-- Create metrics table
CREATE TABLE public.metrics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    label TEXT NOT NULL,
    current NUMERIC NOT NULL,
    total NUMERIC NOT NULL,
    color TEXT,
    unit TEXT,
    warning TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.metrics ENABLE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY "Enable all access for all users" ON public.metrics
FOR ALL USING (true) WITH CHECK (true);

-- Insert dummy data for students
INSERT INTO public.students (name, phone, age, tags, status, timeout, current_task, stage, category, avatar)
VALUES
  ('欧阳春晓', '13811223344', 3.5, ARRAY['重点单', '价格优惠', '未承诺'], '待跟进2次', '05:12后超时', '询问客户的核心关注点及预算范围', 'Lead', 'new', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBS702bpbGZWJD4y7e9SD4K8NDwpUckJrtpRnB0K8aY_T5FS_dg7gBSLWEWaY41uIhCPeFBGPhG2GONSU8tmV_mJBCi2PzuOXZ8F4sFqI-fUcfpzD9SjBCgPmT6mU-4ZgMONGS4Akb5Bg_R9JLq9bQUYb3TM5mWREqzk4eAEP8OML02_eszYrZB9eTSkNwHLvANk1IEDQYemqWzzwHWlWUTBIX63uYZNwyIXCzzRcyjtJAlcmvWgBkI_louI6iS8_ayOp9a-cHV8bkd'),
  ('王梓轩', '13922334455', 5, ARRAY['常规单', '绘本阅读', '未承诺'], '待跟进3次', '22:45后超时', '安排电话沟通确认需求', 'Opportunity', 'followup', NULL),
  ('李慕豪', '13566778899', 4.5, ARRAY['高意向', '已预约', '双语启蒙'], '待上门', '明天 10:00', '准备体验课物料', 'Opportunity', 'visit', NULL),
  ('张三的家长', '13811110001', 3.5, ARRAY['重点单', '价格优惠', '自然到店'], '待跟进2次', '05:12 后超时', '询问痛点', 'Lead', 'new', NULL),
  ('李明妈妈', '13811110003', 4, ARRAY['高意向', '口语启蒙进阶', '周三可试听'], '已跟进', '', '询问痛点', 'Lead', 'visit', NULL);

-- Insert dummy data for metrics
INSERT INTO public.metrics (label, current, total, color, unit, warning)
VALUES
  ('招生人数', 18, 20, '#7C5CFF', '人', NULL),
  ('进班人数', 15, 25, '#3B82F6', '人', NULL),
  ('现金 (元)', 42800, 60000, '#10B981', '', NULL),
  ('退费人数', 4, 5, '#FF5656', '人', '即将达到本月风控值');
