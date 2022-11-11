import {getMDXComponent, MDXContentProps} from 'mdx-bundler/client';
import {FC, useMemo} from 'react';
import Counter from '@mdx/counter';

interface IMDXComponentBase {
  Component: React.FunctionComponent<MDXContentProps>;
}

const MDXComponentBase: FC<IMDXComponentBase> = ({Component}) => (
  <Component
    components={{
      Counter,
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

