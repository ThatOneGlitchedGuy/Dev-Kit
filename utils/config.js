import Conf from 'conf';

const schema = {
  projectName: {
    type: 'string',
    default: 'my-fah-project'
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

const config = new Conf({ projectName: 'fah-cli', schema });
export default config;
