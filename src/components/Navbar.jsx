"use client";

import React, { useState} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Instagram, Facebook, Menu, X } from "lucide-react";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const closeTimeoutRef = React.useRef(null);


  const openMenu = (name) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setOpenDropdown(name);
  };

  const closeMenuWithDelay = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Rate Calculator", href: "/rate-calculator" },
    {
      name: "Purchase",
      href: "/purchase",
      hasDropdown: true,
      dropdownItems: [
        { name: "Buy a Home", href: "/purchase" },
        { name: "Save Money", href: "/refinance" },
        { name: "Use my VA Benefits", href: "/va-loan" },
        { name: "Buy Big", href: "/jumbo-loans" },
        { name: "Remodel", href: "/renovation-loans" },
        { name: "Help With Downpayment", href: "/Downpaymentassistance" },
        { name: "Rural Housing", href: "/usda" },
        { name: "Credit Challenged", href: "/credit-challenged" },
        { name: "Retire Comfortably", href: "/reverse" },
      ],
    },
    { name: "Refinance", href: "/refinance2" },
    {
      name: "Loan Options",
      href: "#",
      hasDropdown: true,
      hasSections: true,
      dropdownSections: [
        {
          title: "TRADITIONAL PROGRAMS",
          items: [
            { name: "Purchase", href: "/purchase" },
            { name: "Refinance", href: "/refinance2" },
            { name: "Conventional Loan", href: "/conventional-loan" },
            { name: "FHA Loan", href: "/fha-loan" },
            { name: "Jumbo Loan", href: "/jumbo-loans" },
          ],
        },
        {
          title: "SPECIALTY PRODUCTS",
          items: [
            { name: "Home Select", href: "/home-select" },
            { name: "Portfolio Lending", href: "/portfolio-lending" },
            { name: "FHA Approved Condos", href: "/fha-approved-condos" },
            { name: "FHA No Credit Score", href: "/fha-no-credit" },
            { name: "Reverse Mortgage", href: "/reverse" },
            { name: "USDA Renovation", href: "/usda-renovation" },
            { name: "Physician Loan", href: "/physician-loan" },
            { name: "Renovation Loan", href: "/renovation-loans" },
            { name: "HELOC", href: "/heloc" },
            { name: "Credit Challenged", href: "/credit-challenged" },
            { name: "USDA Loan", href: "/usdaloan" },
            { name: "Arrive Home Program", href: "/arrive-home" },
            {
              name: "Fixed vs. Adjustable Mortgages",
              href: "/fixed-adjustable",
            },
            { name: "Down Payment Assistance Loans", href: "/Downpaymentassistance" },
            { name: "Self Employed", href: "/self-employed" },
            { name: "First Time Home Buyers", href: "/firsttimehomebuyers" },
          ],
        },
      ],
    },
    { name: "Apply Now", href: "/applynow" },
    {
      name: "Resources",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        // { name: "Mortgage News", href: "/testimonials" },
        { name: "HomyLoans AMP", href: "/amp" },
        { name: "Mortgage Payment", href: "/mortgagepayment" },
        { name: "Login to My Loan", href: "/applynow" },
        // { name: "Mortgage Calculators", href: "/rate-calculator" },
        { name: "Homebuyers Guide", href: "/homebuyer" },
        { name: "Mortgage FAQ", href: "/faq" },
        { name: "Today's Rates", href: "/applynow" },
        { name: "Mortgage Terms Defined", href: "/mortgagetermdefined" },
        { name: "Locations", href: "/findofficer" },
      ],
    },
    {
      name: "Careers",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { name: "Branch & LO Opertunity", href: "/careermeetpurpose" },
        { name: "Operations", href: "/trustedpartner" },
        { name: "Blogs", href: "/blogs" },
      ],
    },
    {
      name: "Our Story",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { name: "About Homy Loans", href: "/aboutus" },
        { name: "Leadership Team", href: "/leadership" },
        { name: "Press Releases", href: "/testimonials" },
        { name: "Be a good human", href: "/goodhuman" },
        { name: "Reviews", href: "/reviews" },
      ],
    },
  ];

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <div className="absolute top-10 left-0 right-0 z-[99999999] flex justify-center px-4 sm:px-6 md:px-8">
        <style>{`
          @media (max-width: 950px) {
            .navbar-container {
              width: 100% !important;
              max-width: 100% !important;
            }
          }
          @media (min-width: 951px) {
            .navbar-container {
              max-width: fit-content;
            }
            .navbar-container.menu-open {
              max-width: 100%;
            }
          }
        `}</style>
        <nav
          className={`navbar-container bg-[#1a1a1a] text-white rounded-full px-3 sm:px-4 md:px-5 py-2 md:py-2.5 shadow-2xl flex items-center justify-between transition-all duration-300 ${
            mobileMenuOpen ? "menu-open" : ""
          }`}
        >
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img
                src="/Logo.svg"
                alt="HomyLoan Logo"
                className="h-6 sm:h-7 md:h-8 xl:h-9 w-auto transition-all duration-300"
              />
            </Link>
          </div>

          {/* Desktop Navigation Menu */}
          <div className="hidden items-center gap-1 mx-3 md:mx-4 lg:mx-5" style={{ display: 'flex' }}>
            <style>{`
              @media (max-width: 950px) {
                .desktop-nav-menu {
                  display: none !important;
                }
              }
            `}</style>
            <div className="desktop-nav-menu flex items-center gap-1">
            {navItems.map((item, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => item.hasDropdown && openMenu(item.name)}
                onMouseLeave={() => item.hasDropdown && closeMenuWithDelay()}
              >
                {item.hasDropdown ? (
                  <div>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-0.5 !text-white hover:!text-white/80 transition-colors text-xs lg:text-sm whitespace-nowrap px-2 lg:px-2.5 py-1.5 rounded-full hover:bg-white/10 no-underline ${
                        isActive(item.href) ? "font-bold" : "font-medium"
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="w-3 h-3" />
                    </Link>

                    {openDropdown === item.name && (
                      <div
                        className={`absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg py-2 z-50 ${
                          item.name === "Loan Options"
                            ? "min-w-[500px]"
                            : item.name === "Purchase"
                            ? "min-w-[400px] grid grid-cols-2 gap-x-2"
                            : item.name === "Resources"
                            ? "min-w-[400px] grid grid-cols-2 gap-x-2"
                            : "min-w-[200px]"
                        }`}
                        onMouseEnter={() => openMenu(item.name)}
                        onMouseLeave={closeMenuWithDelay}
                      >
                        {item.hasSections ? (
                          item.dropdownSections.map((section, sectionIdx) => (
                            <div key={sectionIdx} className={section.title ? "mb-2 last:mb-0" : ""}>
                              {section.title && (
                                <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                  {section.title}
                                </div>
                              )}
                              <div className={`grid grid-cols-2 ${item.name === "Resources" ? "gap-x-6" : "gap-x-2"}`}>
                                {section.items.map((dropdownItem, idx) => (
                                  <Link
                                    key={idx}
                                    href={dropdownItem.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block px-4 py-2 hover:bg-gray-100 transition-colors text-sm !text-black no-underline"
                                  >
                                    {dropdownItem.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))
                        ) : (
                          item.dropdownItems?.map((dropdownItem, idx) => (
                            <Link
                              key={idx}
                              href={dropdownItem.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block px-4 py-2 hover:bg-gray-100 transition-colors text-sm !text-black no-underline"
                            >
                              {dropdownItem.name}
                            </Link>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`!text-white hover:!text-white/80 transition-colors text-xs lg:text-sm whitespace-nowrap px-2 lg:px-2.5 py-1.5 rounded-full hover:bg-white/10 block no-underline ${
                      isActive(item.href) ? "font-bold" : "font-medium"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            </div>
          </div>

          {/* Desktop Social Media Icons */}
          <div className="hidden items-center gap-1.5 pl-1 ml-2" style={{ display: 'flex' }}>
            <style>{`
              @media (max-width: 1100px) {
                .social-icons-nav {
                  display: none !important;
                }
              }
            `}</style>
            <div className="social-icons-nav flex items-center gap-1.5">
            <a
              href="#"
              className="w-6 h-6 rounded-full bg-white text-[#1a1a1a] flex items-center justify-center hover:bg-gray-200 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-3 h-3" />
            </a>
            <a
              href="#"
              className="w-6 h-6 rounded-full bg-white text-[#1a1a1a] flex items-center justify-center hover:bg-gray-200 transition-colors"
              aria-label="TikTok"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-6 h-6 rounded-full bg-white text-[#1a1a1a] flex items-center justify-center hover:bg-gray-200 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-3 h-3" />
            </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <style>{`
            @media (min-width: 951px) {
              .mobile-menu-btn {
                display: none !important;
              }
            }
          `}</style>
          <button
            className="mobile-menu-btn text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <style>{`
        @media (min-width: 951px) {
          .mobile-menu-overlay {
            display: none !important;
          }
        }
      `}</style>
      {mobileMenuOpen && (
        <div
          className="mobile-menu-overlay fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <style>{`
        @media (min-width: 951px) {
          .mobile-menu-container {
            display: none !important;
          }
        }
      `}</style>
      <div
        className={`mobile-menu-container fixed top-24 sm:top-28 left-4 right-4 bg-[#1a1a1a] text-white rounded-2xl shadow-2xl z-50 transition-all duration-300 ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="p-4 max-h-[70vh] overflow-y-auto">
          {navItems.map((item, index) => (
            <div key={index} className="border-b border-white/10 last:border-0">
              {item.hasDropdown ? (
                <div>
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === item.name ? null : item.name,
                      )
                    }
                    className={`w-full flex items-center justify-between py-3 px-2 !text-white text-sm sm:text-base no-underline ${
                      isActive(item.href) ? "font-bold" : "font-medium"
                    }`}
                  >
                    <span>{item.name}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openDropdown === item.name && (
                    <div className="pl-4 pb-2">
                      {item.hasSections ? (
                        item.dropdownSections.map((section, sectionIdx) => (
                          <div key={sectionIdx} className={section.title ? "mb-3 last:mb-0" : ""}>
                            {section.title && (
                              <div className="py-2 text-xs font-bold text-white/60 uppercase tracking-wider">
                                {section.title}
                              </div>
                            )}
                            <div className={`grid grid-cols-2 ${item.name === "Resources" ? "gap-x-4" : "gap-x-2"}`}>
                              {section.items.map((dropdownItem, idx) => (
                                <Link
                                  key={idx}
                                  href={dropdownItem.href}
                                  onClick={() => {
                                    setMobileMenuOpen(false);
                                  }}
                                  className="block py-2 px-2 text-xs sm:text-sm !text-white/80 hover:!text-white no-underline"
                                >
                                  {dropdownItem.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div
                          className={
                            item.name === "Purchase"
                              ? "grid grid-cols-2 gap-x-2"
                              : ""
                          }
                        >
                          {item.dropdownItems?.map((dropdownItem, idx) => (
                            <Link
                              key={idx}
                              href={dropdownItem.href}
                              onClick={() => {
                                setMobileMenuOpen(false);
                              }}
                              className="block py-2 px-2 text-xs sm:text-sm !text-white/80 hover:!text-white no-underline"
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => {
                    setMobileMenuOpen(false);
                  }}
                  className={`block py-3 px-2 !text-white text-sm sm:text-base no-underline ${
                    isActive(item.href) ? "font-bold" : "font-medium"
                  }`}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}

          {/* Mobile Social Media Icons */}
          <div className="flex items-center justify-center gap-3 pt-4 mt-2">
            <a
              href="#"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-[#1a1a1a] flex items-center justify-center hover:bg-gray-200 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a
              href="#"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-[#1a1a1a] flex items-center justify-center hover:bg-gray-200 transition-colors"
              aria-label="TikTok"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-[#1a1a1a] flex items-center justify-center hover:bg-gray-200 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
