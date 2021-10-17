import { promises as fs } from "fs";
import path from "path";
import { getMDXComponent } from "mdx-bundler/client";
import { bundleMDX } from "mdx-bundler";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getHighlighter } from "shiki";
import remarkShiki from "@stefanprobst/remark-shiki";

const Index = ({
	code,
	frontmatter,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	const Component = getMDXComponent(code);
	return (
		<>
			<header>
				<h1>{frontmatter.title}</h1>
				<p>{frontmatter.description}</p>
			</header>
			<main>
				<Component />
			</main>
		</>
	);
};

export default Index;

export const getStaticProps: GetStaticProps = async () => {
	const postData = await getBlogPostData();

	return { props: { ...postData } };
};

const getBlogPostData = async () => {
	const name = path.resolve(process.cwd(), "content", "color.mdx");
	const mdxSource = await fs.readFile(name, "utf8");
	const highlighter = await getHighlighter({ theme: "poimandres" });

	const result = await bundleMDX(mdxSource, {
		cwd: path.dirname(name),
		xdmOptions(options) {
			options.remarkPlugins = [
				...(options.remarkPlugins ?? []),
				[remarkShiki, { highlighter }],
			];
			options.rehypePlugins = [...(options.rehypePlugins ?? [])];

			return options;
		},
		esbuildOptions(options) {
			options.platform = "node";
			return options;
		},
	});

	return result;
};
