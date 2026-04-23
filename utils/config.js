import Conf from 'conf';

const schema = {
  projectName: {
    type: 'string',
    default: 'my-fahhh-project'
  },
  author: {
    type: 'string',
    default: ''
  },
  defaultBranch: {
    type: 'string',
    default: 'main'
  }
};

const config = new Conf({ projectName: 'fahhh-cli', schema });
export default config;
