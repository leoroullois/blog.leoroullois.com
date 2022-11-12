import {getMDXComponent, MDXContentProps} from 'mdx-bundler/client';
import {FC, useMemo} from 'react';
import Warning from '@mdx/warning';
import Info from '@mdx/info';
import Tip from '@mdx/tip';
import H1 from '@mdx/H1';
import H2 from '@mdx/H2';
import H3 from '@mdx/H3';
import H4 from '@mdx/H4';
import H5 from '@mdx/H5';
import H6 from '@mdx/H6';

interface IMDXComponentBase {
  Component: React.FunctionComponent<MDXContentProps>;
}

const MDXComponentBase: FC<IMDXComponentBase> = ({Component}) => (
  <Component
    components={{
      Warning,
      Info,
      Tip,
      h1: H1,
      h2: H2,
      h3: H3,
      h4: H4,
      h5: H5,
      h6: H6,
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
