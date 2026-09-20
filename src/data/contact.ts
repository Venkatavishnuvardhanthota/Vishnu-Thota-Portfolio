export type ContactLink = {
  id: string;
  label: string;
  value: string;
  href: string;
  external?: boolean;
};

/**
 * The only three public contact channels — professional links, no phone
 * number and no social profiles. Values are the owner's verified handles.
 */
export const CONTACT_LINKS: ContactLink[] = [
  {
    id: 'email',
    label: 'Email',
    value: 'venkatavishnuvardhanthota@gmail.com',
    href: 'mailto:venkatavishnuvardhanthota@gmail.com',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'linkedin.com/in/venkata-vishnu-vardhan-thota',
    href: 'https://www.linkedin.com/in/venkata-vishnu-vardhan-thota',
    external: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'github.com/Venkatavishnuvardhanthota',
    href: 'https://github.com/Venkatavishnuvardhanthota',
    external: true,
  },
];

/** Single résumé target shared by the nav, this section, and the footer. */
export const RESUME_URL = '/resume/VishnuThota_CV.pdf';
