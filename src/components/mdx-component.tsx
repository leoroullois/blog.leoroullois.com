import {getMDXComponent, MDXContentProps} from 'mdx-bundler/client';
import {FC, useMemo} from 'react';
import Warning from "@mdx/warning";
import Info from "@mdx/info";
import Tip from "@mdx/tip";

interface IMDXComponentBase {
  Component: React.FunctionComponent<MDXContentProps>;
}

const MDXComponentBase: FC<IMDXComponentBase> = ({Component}) => (
  <Component
    components={{
      Warning,
      Info,
      Tip
    }}
  />
);

interface IMDXComponent {
  code: string;
}

export const MDXComponent: FC<IMDXComponent> = ({code}) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return <MDXComponentBase Component={Component}></MDXComponentBase>;
};

