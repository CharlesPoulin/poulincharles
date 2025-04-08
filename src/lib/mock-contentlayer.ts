// src/lib/mock-contentlayer.ts

// Mock of contentlayer/generated exports
// to allow the app to build while you set up actual content

export const allPosts = [
  {
    _id: 'post-1',
    title: 'Hello World',
    description: 'My first blog post',
    date: new Date('2022-12-31').toISOString(),
    category: 'technical',
    published: true,
    slug: '/blog/technical/hello-world',
    slugAsParams: 'technical/hello-world',
    body: {
      code: `# Hello World

This is my first blog post.`
    }
  },
  {
    _id: 'post-2',
    title: 'Deploying ML Models to Production',
    description: 'Best practices for deploying machine learning models to production environments.',
    date: new Date('2023-11-20').toISOString(),
    category: 'engineering',
    published: true,
    slug: '/blog/engineering/deploying-ml-models-to-production',
    slugAsParams: 'engineering/deploying-ml-models-to-production',
    body: {
      code: '# Deploying ML Models to Production\n\nThis is a sample post about ML deployment best practices.'
    }
  },
  {
    _id: 'post-3',
    title: 'Balancing Work and Learning in ML',
    description: 'How to maintain a healthy balance between work and continuous learning in ML.',
    date: new Date('2023-10-15').toISOString(),
    category: 'life',
    published: true,
    slug: '/blog/life/balancing-work-and-learning-in-ml',
    slugAsParams: 'life/balancing-work-and-learning-in-ml',
    body: {
      code: '# Balancing Work and Learning in ML\n\nThis is a sample post about work-life balance for ML professionals.'
    }
  },
  {
    _id: 'post-4',
    title: 'Introduction to Transformer Models',
    description: 'Learn about the architecture that powers modern NLP models like GPT and BERT.',
    date: new Date('2024-01-14').toISOString(),
    category: 'technical',
    published: true,
    slug: '/blog/technical/introduction-to-transformer',
    slugAsParams: 'technical/introduction-to-transformer',
    body: {
      code: `# Introduction to Transformer Models

Transformer models have revolutionized natural language processing (NLP) since their introduction in the 2017 paper "Attention Is All You Need" by Vaswani et al. They've become the foundation for powerful language models like BERT, GPT, and T5.

## Why Transformers Matter

Before transformers, recurrent neural networks (RNNs) like LSTMs were the dominant architecture for sequence tasks. However, RNNs had limitations:

1. **Sequential processing** - RNNs process text word by word, making them slow to train

2. **Limited context window** - Difficulty capturing long-range dependencies

3. **Vanishing gradient problem** - Information from early words can be lost in long sequences

Transformers addressed these issues through a novel architecture based entirely on attention mechanisms.

## Core Components of the Transformer Architecture

### 1. Self-Attention Mechanism

The key innovation in transformers is the **self-attention mechanism**, which allows the model to focus on different parts of the input sequence when encoding each word. This enables:

- Parallel processing (vs. sequential in RNNs)
- Better handling of long-range dependencies
- More interpretable models

The self-attention calculation involves:

1. Creating query (Q), key (K), and value (V) matrices from the input
2. Computing attention scores: \`Attention(Q, K, V) = softmax(QK^T/√d_k)V\`

### 2. Multi-Head Attention

Rather than performing a single attention function, transformers use **multi-head attention**, which:

- Allows the model to attend to information from different representation subspaces
- Provides multiple "perspectives" on the sequence

### 3. Positional Encoding

Since transformers process all words in parallel, they need a way to understand word order. **Positional encodings** are added to the input embeddings to provide this information, using sine and cosine functions of different frequencies.

## Encoder-Decoder Architecture

The original transformer uses an encoder-decoder structure:

- **Encoder**: Processes the input sequence and creates representations
- **Decoder**: Generates the output sequence based on the encoder representations

Each encoder/decoder block consists of:

1. Multi-head attention layer
2. Feed-forward neural network
3. Layer normalization and residual connections

## Popular Transformer-Based Models

### BERT (Bidirectional Encoder Representations from Transformers)

- Uses only the encoder portion of the transformer
- Pre-trained on masked language modeling and next sentence prediction
- Bidirectional context for each word
- Great for understanding tasks like classification, named entity recognition

### GPT (Generative Pre-trained Transformer)

- Uses primarily the decoder portion of the transformer
- Auto-regressive: predicts the next token based on previous tokens
- Unidirectional attention (each word can only attend to previous words)
- Excellent for text generation tasks

## Implementing a Simple Transformer in PyTorch

Here's a simplified implementation of a transformer encoder layer:

\`\`\`python
import torch
import torch.nn as nn

class TransformerEncoderLayer(nn.Module):
    def __init__(self, d_model, nhead, dim_feedforward, dropout=0.1):
        super().__init__()
        self.self_attn = nn.MultiheadAttention(d_model, nhead, dropout=dropout)
        self.linear1 = nn.Linear(d_model, dim_feedforward)
        self.dropout = nn.Dropout(dropout)
        self.linear2 = nn.Linear(dim_feedforward, d_model)
        
        self.norm1 = nn.LayerNorm(d_model)
        self.norm2 = nn.LayerNorm(d_model)
        self.dropout1 = nn.Dropout(dropout)
        self.dropout2 = nn.Dropout(dropout)
        
        self.activation = nn.ReLU()
        
    def forward(self, src, src_mask=None, src_key_padding_mask=None):
        # Self-attention block
        src2 = self.self_attn(src, src, src, attn_mask=src_mask,
                              key_padding_mask=src_key_padding_mask)[0]
        src = src + self.dropout1(src2)
        src = self.norm1(src)
        
        # Feed-forward block
        src2 = self.linear2(self.dropout(self.activation(self.linear1(src))))
        src = src + self.dropout2(src2)
        src = self.norm2(src)
        return src
\`\`\`

## Conclusion

Transformers have become the backbone of modern NLP and are increasingly used in computer vision, reinforcement learning, and even biological sequence analysis. Their ability to process sequences in parallel and capture long-range dependencies has made them incredibly powerful.

As an ML engineer, understanding transformer architecture is essential for working with state-of-the-art models and building advanced applications in natural language processing and beyond.

## Further Reading

1. "Attention Is All You Need" (Vaswani et al., 2017)
2. "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding" (Devlin et al., 2018)
3. "The Illustrated Transformer" by Jay Alammar (blog post)
4. "The Annotated Transformer" (Harvard NLP)
`
    }
  },
  {
    _id: 'post-5',
    title: 'Becoming a Senior ML Engineer',
    description: 'Insights and lessons learned on the path to becoming a senior machine learning engineer',
    date: new Date('2024-02-14').toISOString(),
    category: 'technical',
    published: true,
    slug: '/blog/technical/senior-ml-enngineer',
    slugAsParams: 'technical/senior-ml-enngineer',
    body: {
      code: `# Becoming a Senior ML Engineer

The journey to becoming a senior machine learning engineer involves mastering both technical skills and soft skills that enable you to lead projects and mentor junior engineers.

## Technical Expertise

As a senior ML engineer, you need deep knowledge in:

- Machine learning algorithms and their implementation
- Software engineering best practices
- MLOps and deployment pipelines
- Data preprocessing and feature engineering

## System Design Skills

Being able to design robust machine learning systems involves:

- Understanding the full ML lifecycle
- Designing for scalability and performance
- Implementing effective monitoring and maintenance strategies
- Creating reusable components and abstractions

## Leadership and Communication

A senior role requires you to:

- Mentor junior team members
- Communicate complex technical concepts to non-technical stakeholders
- Lead projects from conception to deployment
- Make architectural decisions that balance business needs with technical constraints

## Continuous Learning

The field evolves quickly, so staying current is essential:

- Reading research papers
- Experimenting with new techniques
- Attending conferences and workshops
- Contributing to open-source projects

Becoming a senior ML engineer is not just about years of experience but about the depth and breadth of your knowledge and your ability to apply it effectively to solve complex problems.`
    }
  },
];
  
export const allProjects = [
  {
    _id: 'project-1',
    title: 'Neural Style Transfer',
    description: 'A deep learning implementation of neural style transfer using TensorFlow and Keras.',
    date: new Date('2023-12-01').toISOString(),
    image: '/images/projects/neural-style-transfer.jpg',
    github: 'https://github.com/yourusername/neural-style-transfer',
    demo: 'https://neural-style-demo.vercel.app',
    techs: ['TensorFlow', 'Keras', 'Python', 'Computer Vision'],
    published: true,
    featured: true,
    slug: '/projects/neural-style-transfer',
    slugAsParams: 'neural-style-transfer',
    body: {
      code: '# Neural Style Transfer\n\nThis is a sample project.'
    }
  },
  {
    _id: 'project-2',
    title: 'Recommendation System',
    description: 'A collaborative filtering recommendation system built with PyTorch and deployed with FastAPI.',
    date: new Date('2023-11-01').toISOString(),
    image: '/images/projects/recommendation-system.jpg',
    github: 'https://github.com/yourusername/recommendation-system',
    demo: 'https://recommendation-demo.vercel.app',
    techs: ['PyTorch', 'FastAPI', 'Python', 'Recommendation Systems'],
    published: true,
    featured: true,
    slug: '/projects/recommendation-system',
    slugAsParams: 'recommendation-system',
    body: {
      code: '# Recommendation System\n\nThis is a sample project.'
    }
  },
  {
    _id: 'project-3',
    title: 'Fraud Detection Service',
    description: 'Real-time fraud detection using ensemble models and streaming data processing.',
    date: new Date('2023-10-01').toISOString(),
    image: '/images/projects/fraud-detection.jpg',
    github: 'https://github.com/yourusername/fraud-detection',
    demo: 'https://fraud-detection-demo.vercel.app',
    techs: ['Scikit-learn', 'Kafka', 'Spark', 'Python'],
    published: true,
    featured: true,
    slug: '/projects/fraud-detection',
    slugAsParams: 'fraud-detection',
    body: {
      code: '# Fraud Detection Service\n\nThis is a sample project.'
    }
  }
];
  
export const allExperiences = [
  {
    _id: 'experience-1',
    title: 'Machine Learning Engineer',
    company: 'AI Solutions Inc.',
    location: 'San Francisco, CA',
    startDate: new Date('2022-01-15').toISOString(),
    endDate: new Date('2023-08-30').toISOString(),
    current: false,
    techs: ['PyTorch', 'TensorFlow', 'Python', 'AWS', 'Docker'],
    published: true,
    body: {
      code: '## Responsibilities\n\n- Developed and deployed machine learning models\n- Optimized model inference time\n- Collaborated with cross-functional teams to integrate ML solutions\n- Participated in code reviews and mentored junior engineers'
    }
  },
  {
    _id: 'experience-2',
    title: 'Data Scientist',
    company: 'Data Insights Co.',
    location: 'Remote',
    startDate: new Date('2020-05-01').toISOString(),
    endDate: new Date('2021-12-31').toISOString(),
    current: false,
    techs: ['Python', 'Pandas', 'scikit-learn', 'SQL'],
    published: true,
    body: {
      code: '## Responsibilities\n\n- Performed data analysis and built predictive models\n- Worked with stakeholders to define KPIs\n- Created data visualization dashboards\n- Implemented ETL pipelines for data processing'
    }
  },
  {
    _id: 'experience-3',
    title: 'ML Research Intern',
    company: 'Tech University AI Lab',
    location: 'Boston, MA',
    startDate: new Date('2019-06-01').toISOString(),
    endDate: new Date('2019-12-31').toISOString(),
    current: false,
    techs: ['Python', 'TensorFlow', 'Research'],
    published: true,
    body: {
      code: '## Responsibilities\n\n- Conducted research on novel deep learning architectures\n- Implemented and evaluated experimental models\n- Contributed to research papers\n- Presented findings at lab meetings'
    }
  }
];