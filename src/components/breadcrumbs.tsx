import { Link } from 'react-router-dom';

type Crumb = {
  name: string;
  path: string;
};

type BreadcrumbsProps = {
  crumbs: Crumb[];
};

function Breadcrumbs({ crumbs }: BreadcrumbsProps) {
  return (
    <section className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          {crumbs.map((crumb, index) => (
            <li key={`${crumb.name}-${crumb.path}`} className="breadcrumbs__item">
              {index === crumbs.length - 1 ? (
                <span className="breadcrumbs__link breadcrumbs__link--active">
                  {crumb.name}
                </span>
              ) : (
                <Link className="breadcrumbs__link" to={crumb.path}>
                  {crumb.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Breadcrumbs;
