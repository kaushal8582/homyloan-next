const fs = require('fs');
const path = require('path');

// Mapping of route names to Page component names
const routeToPageMap = {
  'aboutus': 'AboutUs',
  'advertisement': 'Advertisement',
  'amp': 'AMP',
  'applynow': 'Applynow',
  'arrive-home': 'ArriveHome',
  'careermeetpurpose': 'Careermeetspurpose',
  'conventional-loan': 'ConventionalLoan',
  'credit-challenged': 'Credit',
  'data-privacy-security': 'DataPrivicySecurity',
  'dodd-frank': 'DoddFrank',
  'downpayment': 'Downpayment',
  'Downpaymentassistance': 'DownPaymentAssistance',
  'ecoa': 'Ecoa',
  'fair-housing': 'FairHouseingAct',
  'fair-lending': 'FairLeading',
  'faq': 'FAQ',
  'fha-approved-condos': 'FHAApprovedCondos',
  'fha-loan': 'FHALoan',
  'fha-no-credit': 'FHANoCreditScore',
  'findofficer': 'FindOfficer',
  'firsttimehomebuyers': 'FirstTimeHomeBuyers',
  'fixed-adjustable': 'FixedAdjustable',
  'goodhuman': 'GoodHuman',
  'heloc': 'HELOC',
  'homebuyer': 'HomeBuyer',
  'home-select': 'HomeSelect',
  'jumbo-loans': 'JumboLoans',
  'leadership': 'Leadership',
  'loanofficer': 'BecomingLoanOfficer',
  'mortgagepayment': 'Mortgagepayment',
  'mortgagetermdefined': 'MortgageTermDefined',
  'open-positions': 'OpenPositions',
  'physician-loan': 'PhysicianLoan',
  'portfolio-lending': 'PortfolioLending',
  'rate-calculator': 'RateCalculator',
  'referral': 'Referral',
  'referral2': 'Referral2',
  'refinance': 'Refinance',
  'refinance2': 'Refinance2',
  'renovation-loans': 'RenovationLoans',
  'reverse': 'Reverse',
  'reviews': 'Review',
  'self-employed': 'SelfEmployed',
  'state-law-regulation': 'StateLawRegulation',
  'survey': 'SurveyForm',
  'testimonials': 'Testimonials',
  'training-and-education': 'TraningAndEducation',
  'trustedpartner': 'TrustedPartner',
  'usda': 'USDA',
  'usdaloan': 'USDALoan',
  'usda-renovation': 'USDARenovation',
  'va-loan': 'VALoan',
};

// Special cases for nested routes
const nestedRouteMap = {
  'careers/branch-managers': 'BranchManagers',
  'careers/marketing-sales': 'MarketingSales',
  'careers/mortgage-loan-officers': 'MortgageLoanOfficers',
  'careers/operations-support': 'OperationsSupport',
  'blogs': 'Blogs',
  'blogs/[id]': 'BlogPost',
  'press': 'Press',
  'press/[id]': 'PressPost',
  'jobs/[id]': 'JobPost',
  'jobs/[id]/apply': 'JobApplicationForm',
};

function updatePageFile(appPagePath, pageComponentName) {
  const pagesDir = path.join(__dirname, '..', 'src', 'pages');
  const pageComponentPath = path.join(pagesDir, `${pageComponentName}.jsx`);
  
  if (!fs.existsSync(pageComponentPath)) {
    console.log(`⚠️  Page component not found: ${pageComponentPath}`);
    return false;
  }

  let pageContent = fs.readFileSync(pageComponentPath, 'utf8');
  
  // Ensure "use client" is at the top
  if (!pageContent.includes('"use client"')) {
    pageContent = '"use client";\n\n' + pageContent;
  }
  
  // Convert function declarations to export default function
  // This is a simple conversion - may need manual adjustment for some files
  pageContent = pageContent.replace(
    /^(const|function)\s+(\w+)\s*=\s*(\([^)]*\)\s*=>|\([^)]*\))\s*{/m,
    (match, decl, name, arrow) => {
      if (decl === 'function') {
        return `export default function ${name}(`;
      }
      return match; // Keep const/arrow functions as is for now
    }
  );
  
  // Remove existing export default if it's a separate line
  pageContent = pageContent.replace(/^export default \w+;?\s*$/m, '');
  
  // Ensure export default function for const declarations
  if (pageContent.match(/^const \w+ = \(/m)) {
    // This needs manual handling - keeping original for now
  }
  
  // Write to app page file
  fs.writeFileSync(appPagePath, pageContent, 'utf8');
  console.log(`✅ Updated: ${appPagePath}`);
  return true;
}

function updateAllPages() {
  const appDir = path.join(__dirname, '..', 'src', 'app');
  let updated = 0;
  let skipped = 0;
  
  function processDirectory(dir, routePrefix = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        const newPrefix = routePrefix ? `${routePrefix}/${entry.name}` : entry.name;
        processDirectory(fullPath, newPrefix);
      } else if (entry.name === 'page.jsx') {
        const pageContent = fs.readFileSync(fullPath, 'utf8');
        
        // Check if it's a wrapper page
        if (pageContent.includes('import Page from')) {
          const routeName = routePrefix || 'home';
          let pageComponentName;
          
          // Check nested routes first
          if (nestedRouteMap[routeName]) {
            pageComponentName = nestedRouteMap[routeName];
          } else if (routeToPageMap[routeName]) {
            pageComponentName = routeToPageMap[routeName];
          } else {
            // Try to infer from route name
            pageComponentName = routeName
              .split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join('');
          }
          
          if (updatePageFile(fullPath, pageComponentName)) {
            updated++;
          } else {
            skipped++;
          }
        }
      }
    }
  }
  
  processDirectory(appDir);
  console.log(`\n📊 Summary: ${updated} pages updated, ${skipped} skipped`);
}

// Run the script
updateAllPages();
