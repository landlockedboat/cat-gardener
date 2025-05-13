import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Link } from "@heroui/link";
import { Card, Spacer } from "@heroui/react";

export default function AboutPage() {
  return (
    <DefaultLayout>
      <div className="w-full text-center">
        <div className={title()}>Disclaimer</div>
      </div>
      <section className="text-lg px-8 py-8 flex flex-col gap-3">
        <p>
          The information presented on this site is derived from the ASPCA's
          “Toxic and Non-Toxic Plants” list available at
          <Link href="https://www.aspca.org/pet-care/animal-poison-control/toxic-and-non-toxic-plants">
            https://www.aspca.org/pet-care/animal-poison-control/toxic-and-non-toxic-plants
          </Link>{" "}
          and is used here solely for educational, non-commercial, and research
          purposes.
        </p>
        <p>
          This use is believed to qualify as “fair use” under Section 107 of the
          U.S. Copyright Act; as a permissible “citación” under Article 32 of
          Spain's Intellectual Property Law; and as a non-commercial extraction
          under the EU Database Directive (96/9/EC) and the EU Digital Single
          Market Directive's text-and-data-mining exceptions.
        </p>
        <p>
          No claim is made to ownership of the underlying database, and all
          rights remain with the ASPCA.
        </p>
        <p>
          If you believe any content has been used in error, please{" "}
          <Link href="mailto:landlockedboat@gmail.com">contact us </Link>.
        </p>
      </section>
    </DefaultLayout>
  );
}
