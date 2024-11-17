import React, { useState } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { styled } from '@mui/material/styles';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeContainer = styled(Box)({
  position: 'relative',
  margin: '8px 0',
});

const CopyButton = styled(IconButton)({
  position: 'absolute',
  top: '8px',
  right: '8px',
  padding: '4px',
  backgroundColor: '#2d2d2d',
  color: '#d4d4d4',
  '&:hover': {
    backgroundColor: '#3d3d3d',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '16px',
  },
});

interface CodeBlockProps {
  language: string;
  value: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <CodeContainer>
      <Tooltip title={copied ? 'Copied!' : 'Copy code'} placement="top">
        <CopyButton onClick={handleCopy} size="small">
          {copied ? <CheckIcon /> : <ContentCopyIcon />}
        </CopyButton>
      </Tooltip>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus as any}
        customStyle={{
          margin: 0,
          padding: '16px',
          backgroundColor: '#1e1e1e',
          borderRadius: '4px',
        }}
      >
        {value}
      </SyntaxHighlighter>
    </CodeContainer>
  );
};

export default CodeBlock;
