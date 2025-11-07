'use client';

import styles from './NondiscriminatoryPolicy.module.css';

interface PolicyProps {
  title?: string;
  text?: string;
}

export default function NondiscriminatoryPolicy({
  title = 'Nondiscriminatory Policy',
  text = "Illinois Conservatory for the Arts employs staff and admits students of any race, color, national origin, ethnic origin, gender, religion, and sexual orientation to all the rights, privileges, programs, and activities generally accorded or made available to students at the school. It doesn't discriminate on the basis of race, color, national origin, and ethnic origin, gender, religion, and sexual orientation in administration of its educational policies, admission policies, scholarship and loan programs, and other school-administered programs.",
}: PolicyProps) {
  return (
    <section
      id="ica-nondiscriminatory-policy"
      className={styles.icaNondiscriminatoryPolicy}
      aria-labelledby="policy-heading"
    >
      <div className={styles.sectionInner}>
        <div className={styles.policyCard}>
          <h2 id="policy-heading" className={styles.policyCardTitle}>
            {title}
          </h2>
          <p className={styles.policyCardText}>{text}</p>
        </div>
      </div>
    </section>
  );
}
