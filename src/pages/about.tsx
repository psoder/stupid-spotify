import fs from "fs/promises";
import { marked } from "marked";

export async function getStaticProps() {
    let md = "";
    try {
        md = await fs.readFile(`${process.cwd()}/docs/README.md`, "utf8");
    } catch (e) {
        console.error(e);
    }

    const html = marked.parse(md);

    return {
        props: { html: html }
    };
}

const About = ({ html }: { html: string }) => {
    return (
        <div className="readme mx-auto my-12 mb-28 max-w-[100ch] rounded bg-black-light p-8 text-white-bright shadow-md shadow-black-heavy">
            <p>
                <i>The following has been auto-generated from the projects README.</i>
            </p>
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
    );
};

export default About;
