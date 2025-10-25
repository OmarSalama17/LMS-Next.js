"use client";
import { usePathname , Link} from "../../src/i18n/navigation";
import React from "react";

const formatSegmentName = (segment) => {
  if (!segment) return '';
  return segment
    .split('-') 
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
    .join(' ');
};


const PathName = () => {
  const pathName = usePathname(); 

  const segments = pathName.split('/').filter(Boolean);

  const breadcrumbItems = [

    {
      name: "Home",
      href: '/',   
    }
  ];

  let currentHref = '';

  segments.forEach(segment => {
    currentHref += `/${segment}`;
    breadcrumbItems.push({
      name: formatSegmentName(segment), 
      href: currentHref
    });
  });
  
  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center gap-2">
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={item.href + index}>
            
            {index > 0 && (
              <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                /
              </span>
            )}

            {index === breadcrumbItems.length - 1 ? (
              <span className="text-text-light dark:text-text-dark text-sm font-medium">
                {decodeURIComponent(item.name)}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-gray-500 dark:text-gray-400 text-sm font-medium hover:text-primary"
              >
                {item.name }
              </Link>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default PathName;