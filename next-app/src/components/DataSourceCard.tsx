import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  sanitizeURL,
  createSafeImageSrc,
  sanitizeText,
  sanitizeHTML,
} from "@/lib/security-utils";

interface DataSourceCardProps {
  dataSource: {
    name: string;
    url: string;
    description: string;
    thumbnail: string;
  };
  searchTerms: string[];
  highlightSearchTerms: (text: string, searchTerms: string[]) => string;
}

export const DataSourceCard = ({
  dataSource,
  searchTerms,
  highlightSearchTerms,
}: DataSourceCardProps) => (
  <article key={dataSource.name} role="listitem" className="mb-6">
    <Card className="h-full">
      <CardHeader className="bg-muted">
        <CardTitle className="flex flex-row justify-between items-center gap-4 sm:flex-row">
          <a
            href={sanitizeURL(dataSource.url)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-primary hover:underline grow focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            aria-label={`Visit ${sanitizeText(
              dataSource.name
            )} website (opens in new tab)`}
            dangerouslySetInnerHTML={{
              __html: sanitizeHTML(
                highlightSearchTerms(
                  sanitizeText(dataSource.name),
                  searchTerms
                ),
                ["mark"],
                ["class"]
              ),
            }}
          />
          <img
            className="w-40 h-10 object-contain object-right"
            src={createSafeImageSrc(dataSource.thumbnail)}
            alt=""
            role="presentation"
            aria-hidden="true"
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <p
          dangerouslySetInnerHTML={{
            __html: sanitizeHTML(
              highlightSearchTerms(dataSource.description, searchTerms),
              ["mark"],
              ["class"]
            ),
          }}
        />
      </CardContent>
    </Card>
  </article>
);
