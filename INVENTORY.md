# onegrowlearning.com - Content Inventory

Source: All-in-One WP Migration backup (17 Nov 2026), WordPress 6.7, Hello Elementor theme + Elementor Pro.
Live sitemap (`/wp-sitemap.xml`) lists **34 pages**, and the database has exactly the same 34 published pages. No blog posts, no LMS.

Har page ka poora text `content/pages/<slug>.md` me hai. Popups/forms `content/templates/`, header/footer `content/header-footer/`.

## Folder layout

| Path | Kya hai |
|---|---|
| `wp-export/` | Backup se nikla original data (`database.sql`, `uploads/`, themes, plugins). Private rakhna, isme form leads aur user data hai. |
| `wp-export/raw/` | Har page ka Elementor JSON |
| `content/pages/` | 31 pages ka readable markdown (text, buttons, links, images, tabs, accordions) |
| `content/templates/` | Popups: enquiry form, course-wise brochure forms, mobile menu |
| `content/header-footer/` | Header aur footer |
| `content/_images_used.json` | Pages me use hui 86 images aur kis page pe |
| `scripts/elementor_to_md.py` | Converter (dobara chala sakte hain) |

Local MariaDB me database `onegrow_wp` naam se import hai, query karne ke liye.

## Pages (34)

### Main pages
| URL | Page | Note |
|---|---|---|
| `/` | Homepage | Hero, university course carousels (MUJ + SMU), accreditations, videos, testimonials |
| `/about-us/` | About Us | |
| `/popular-programs/` | Popular Programs | Sab courses ki listing (header ka "Explore Courses") |
| `/our-partners/` | Our Partners | Sirf 2 logos (MUJ, SMU) |
| `/contact-us/` | Contact Us | **Placeholder content, neeche dekho** |
| `/pg-in-entrepreneurship-welingker-institute/` | PG in Entrepreneurship (Welingkar) | Menu me link nahi |
| `/circle-of-excellence-referee/` | Circle of Excellence (referral) | Menu me link nahi |
| `/thank-you-page/` | Thank You | Form submit ke baad redirect |
| `/privacy-policy/` | Privacy Policy | ~6k words |
| `/terms-conditions/` | Terms & Conditions | ~20k words |
| `/career-support/` | Career Support | **Khali page** |
| `/success-stories/` | Success Stories | **Khali page** |
| `/resource/` | Resource | **Khali page** |

### Course pages (21)
| University | Course | URL | Duration | Full fee |
|---|---|---|---|---|
| Manipal University Jaipur (MUJ) | MBA | `/master-of-business-administration-muj/` | 24 months | INR 1,75,000 |
| MUJ | MCA | `/master-of-computer-application/` | 24 months | INR 1,58,000 |
| MUJ | M.Com | `/master-of-commerce/` | 24 months | INR 1,08,000 |
| MUJ | MA Economics | `/master-of-arts-economics/` | 24 months | INR 80,000 |
| MUJ | MA JMC | `/master-of-arts-in-journalism-mass-communication-online-ma-jmc/` | 24 months | INR 1,45,000 |
| MUJ | BBA | `/bachelor-of-business-administration/` | 36 months | INR 1,35,000 |
| MUJ | BCA | `/bachelor-of-computer-applications-bca/` | 36 months | INR 1,35,000 |
| MUJ | B.Com | `/bachelor-of-commerce-muj/` | 36 months | INR 99,000 |
| Sikkim Manipal (SMU) | MBA | `/master-of-business-administration/` | 24 months | INR 1,10,000 |
| SMU | MCA | `/master-of-computer-application-smu/` | 24 months | INR 98,000 |
| SMU | M.Com | `/master-of-commerce-smu/` | 24 months | INR 79,000 |
| SMU | MA English | `/master-of-arts-english/` | 24 months | INR 79,000 |
| SMU | MA Sociology | `/master-of-arts-sociology/` | 24 months | INR 79,000 |
| SMU | MA Political Science | `/master-of-arts-political-science/` | 24 months | INR 79,000 |
| SMU | BA | `/bachelor-of-arts/` | 36 months | INR 81,000 |
| SMU | B.Com | `/bachelor-of-commerce/` | 36 months | INR 81,000 |
| Shoolini | MBA | `/shoolini-online-mba/` | 2 years | alag fee format |
| Shoolini | MCA | `/shoolini-online-mca/` | 2 years | alag fee format |
| Shoolini | MA | `/shoolini-online-ma/` | 2 years | alag fee format |
| Shoolini | BBA | `/shoolini-online-bba/` | 3 years | alag fee format |
| Shoolini | BCA | `/shoolini-online-bca/` | 3 years | alag fee format |

MUJ/SMU course pages ka structure ek jaisa hai: hero + enquiry form, key facts (commencement, closure date, duration), accreditations, program advantages, job profiles/industries tabs, semester-wise curriculum, specializations, degree sample, fee & scholarships (Indian / NRI tabs, EMI), FAQs. Next.js me ye ek hi template + per-course data file ban jayega.

## Forms aur popups
- **Request a Callback / Enquiry Now** popup (`templates/enquiry-now1.md`, #903)
- **Course-wise brochure/Enroll popups** (BA, BBA, BCA, B.Com, MBA, MCA, M.Com, MA variants): Full Name, phone (country code), email, status dropdown, consent checkbox
- Submit hone pe Elementor DB me save + email + redirect to `/thank-you-page/`. 25 purane submissions DB me hain.
- Next.js me forms ke liye naya backend chahiye (email API ya CRM). HubSpot plugin (`leadin`) bhi install hai, confirm karna hai use ho raha hai ya nahi.

## Live site pe mile issues (redesign me theek karne hain)
1. **Contact Us page pe kisi aur business ka placeholder data:** phone `4037019427`, email `rocaincproducts@gmail.com`, Calgary (Canada) ka address aur map. Asli contact (footer se): +91-9318405586, info@onegrowlearning.com. Office address chahiye.
2. **3 khali pages:** Career Support, Success Stories, Resource. Rakhne hain to content chahiye, warna hata do.
3. **Footer typo:** "© 2024 Onrgrow Learning Pvt Ltd".
4. **Homepage pe galat Enroll popups:** MUJ "MA-JMC" ka Enroll button MA English form khulta hai (Popular tab) aur BCA form (Master's tab); SMU "MA-ENGLISH" pe Sociology form khulta hai. Leads galat course ke naam se aa rahi hongi.
5. **Leadership Team section** (homepage) har device pe hidden hai aur placeholder text hai: chaaron logo ka naam "Mrs. Alpa Karkhanis, Director".
6. **Homepage hero** me "Amazing" strikethrough headline, aur kai sections mobile/desktop ke liye do baar bane hain. Next.js me ek responsive version kaafi hai.
7. **Welingkar page ki 2 images** (`g3.jpg`, `g4.jpg`) live pe bhi 404 hain.
8. Homepage URL `/homepage/` aur `/` dono pe hai. Footer/logo links `/homepage/` pe jaate hain.

9. **Referral form** (`/circle-of-excellence-referee/`) me koi submit action set nahi hai, to wahan bhara data shayad kahin nahi ja raha.
10. **Welingkar page** copy-paste se bana hai: URL "PG in Entrepreneurship" ka hai, heading "PG in Media & Entertainment" ki, content Family Business wala, Duration/Eligibility/Fee teeno me ek hi line, "2024 batch" date, aur form submit hone pe `yangpoo.com` (dusri site) pe redirect hota hai.
11. **Shoolini pages:** sab Enroll buttons MUJ ke BCA aur Political Science brochure form kholte hain. Shoolini MBA ka "Domain" BCA likha hai.
12. Floating WhatsApp button (Chaty plugin) +91-9318405586 pe hai, naye site me bhi rakhna hai.

## Decisions (17 Nov 2026)
- **Office address:** website pe nahi hai, nahi daalna. Contact page pe sirf phone, email, WhatsApp aur form.
- **Career Support, Success Stories, Resource:** hata do (ye bilkul khali hain).
- **Baaki koi page nahi hatana** jisme content hai aur jo live hai (Welingkar aur referral page bhi rahenge). Jo galtiyan hain, unhe official sources se online check karke theek karna hai. Corrections `CORRECTIONS.md` me source ke saath.
- **Form leads:** email pe jaayengi.
- **Leadership team:** nahi dikhani.
