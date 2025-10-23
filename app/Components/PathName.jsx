"use client";
import { usePathname , Link} from "../../src/i18n/navigation";
import React from "react";

/**
 * دالة بسيطة لتنسيق أسماء المسارات
 * "contact-us"  => "Contact Us"
 * "courses"     => "Courses"
 */
const formatSegmentName = (segment) => {
  if (!segment) return '';
  return segment
    .split('-') // يقسم "contact-us" إلى ["contact", "us"]
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // يحول "contact" إلى "Contact"
    .join(' '); // يجمعها لتصبح "Contact Us"
};


const PathName = () => {
  // هذا الهوك من المفترض أنه يعطيك المسار بدون لغة
  // مثال: /courses/my-course-slug
  const pathName = usePathname(); 

  // 1. نقسم المسار إلى أجزاء
  // مثال: /courses/my-course-slug -> ['courses', 'my-course-slug']
  const segments = pathName.split('/').filter(Boolean);

  // 2. نبني مصفوفة الـ items (الروابط)
  const breadcrumbItems = [
    // 2.1. العنصر الأول دائماً هو "Home" (ثابت)
    {
      name: "Home", // اسم ثابت
      href: '/',    // رابط ثابت للصفحة الرئيسية
    }
  ];

  // 2.2. متغير لتجميع المسار خطوة بخطوة
  let currentHref = '';

  // 2.3. نلف على الأجزاء ونضيفها للمصفوفة
  segments.forEach(segment => {
    currentHref += `/${segment}`;
    breadcrumbItems.push({
      // نستخدم الدالة لتنسيق اسم المسار بدلاً من الترجمة
      name: formatSegmentName(segment), 
      href: currentHref
    });
  });
  
  // 3. نعرض الـ JSX (هذا الجزء لم يتغير)
  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center gap-2">
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={item.href + index}>
            
            {/* 3.1. نعرض الفاصل '/' قبل كل عنصر ما عدا الأول */}
            {index > 0 && (
              <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                /
              </span>
            )}

            {/* 3.2. نفحص: هل هذا هو العنصر الأخير في المسار؟ */}
            {index === breadcrumbItems.length - 1 ? (
              // إذا كان الأخير: اعرضه كنص ثابت (الصفحة الحالية)
              <span className="text-text-light dark:text-text-dark text-sm font-medium">
                {item.name}
              </span>
            ) : (
              // إذا لم يكن الأخير: اعرضه كـ <Link>
              <Link
                href={item.href}
                className="text-gray-500 dark:text-gray-400 text-sm font-medium hover:text-primary"
              >
                {item.name}
              </Link>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default PathName;