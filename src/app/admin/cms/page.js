"use client";

import { useState } from "react";
import { Plus, Edit, Eye, Trash2, FileText, Home, Mail, Info, ShieldCheck, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchInput } from "@/components/common/search-input";
import { StatusBadge } from "@/components/common/status-badge";
import { PageHeader } from "@/components/common/page-header";
import { DataTable } from "@/components/common/data-table";
import { TableActions } from "@/components/common/table-actions";
import Link from "next/link";

const cmsPages = [
  {
    id: '1',
    title: 'Homepage',
    slug: 'homepage',
    type: 'page',
    status: 'published',
    lastModified: '2024-01-15',
    modifiedBy: 'Admin',
    icon: Home,
    description: 'Main landing page content and banners'
  },
  {
    id: '2',
    title: 'About Us',
    slug: 'about-us',
    type: 'page',
    status: 'published',
    lastModified: '2024-01-12',
    modifiedBy: 'Admin',
    icon: Info,
    description: 'Company information and story'
  },
  {
    id: '3',
    title: 'Contact Us',
    slug: 'contact-us',
    type: 'page',
    status: 'published',
    lastModified: '2024-01-10',
    modifiedBy: 'Admin',
    icon: Mail,
    description: 'Contact information and form'
  },
  {
    id: '4',
    title: 'Privacy Policy',
    slug: 'privacy-policy',
    type: 'legal',
    status: 'published',
    lastModified: '2024-01-08',
    modifiedBy: 'Admin',
    icon: ShieldCheck,
    description: 'Privacy policy and data handling'
  },
  {
    id: '5',
    title: 'Terms & Conditions',
    slug: 'terms-conditions',
    type: 'legal',
    status: 'published',
    lastModified: '2024-01-08',
    modifiedBy: 'Admin',
    icon: FileText,
    description: 'Terms of service and conditions'
  },
  {
    id: '6',
    title: 'Size Guide',
    slug: 'size-guide',
    type: 'help',
    status: 'published',
    lastModified: '2024-01-14',
    modifiedBy: 'Admin',
    icon: HelpCircle,
    description: 'Clothing size guide and measurements'
  },
  {
    id: '7',
    title: 'Return Policy',
    slug: 'return-policy',
    type: 'help',
    status: 'draft',
    lastModified: '2024-01-13',
    modifiedBy: 'Admin',
    icon: FileText,
    description: 'Return and exchange policy'
  }
];

const pageTypes = [
  { label: 'All Types', value: 'all' },
  { label: 'Pages', value: 'page' },
  { label: 'Legal', value: 'legal' },
  { label: 'Help', value: 'help' }
];

export default function CMSPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredPages = cmsPages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || page.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const columns = [
    {
      accessorKey: "title",
      header: "Page",
      cell: ({ row }) => {
        const page = row.original;
        const IconComponent = page.icon;
        return (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <IconComponent className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium text-foreground">{page.title}</p>
              <p className="text-sm text-muted-foreground">/{page.slug}</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ getValue }) => (
        <span className="text-sm text-muted-foreground">{getValue()}</span>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ getValue }) => (
        <span className="capitalize text-foreground">{getValue()}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => <StatusBadge status={getValue()} />,
    },
    {
      id: "lastModified",
      header: "Last Modified",
      cell: ({ row }) => {
        const page = row.original;
        return (
          <div>
            <p className="text-sm text-foreground">{page.lastModified}</p>
            <p className="text-xs text-muted-foreground">by {page.modifiedBy}</p>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const page = row.original;
        return (
          <TableActions
            viewHref={`/admin/cms/${page.id}/preview`}
            editHref={`/admin/cms/${page.id}/edit`}
            onDelete={() => console.log("Delete", page.id)}
          />
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader 
        title="Content Management"
        description="Manage website content, pages, and legal documents"
      >
    
      </PageHeader>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/admin/cms/homepage/edit">
          <Card className="cursor-pointer hover:shadow-md transition-shadow pt-4">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Home className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-medium">Homepage</h3>
                  <p className="text-sm text-muted-foreground">Edit main content</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/cms/banners">
          <Card className="cursor-pointer hover:shadow-md transition-shadow pt-4">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-medium">Banners</h3>
                  <p className="text-sm text-muted-foreground">Manage banners</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/cms/contact-us/edit">
          <Card className="cursor-pointer hover:shadow-md transition-shadow pt-4">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Mail className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-medium">Contact Info</h3>
                  <p className="text-sm text-muted-foreground">Update contact details</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/cms/footer">
          <Card className="cursor-pointer hover:shadow-md transition-shadow pt-4">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Info className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-medium">Footer</h3>
                  <p className="text-sm text-muted-foreground">Footer content</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Search */}
      <SearchInput
        placeholder="Search pages..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Pages Table */}
      <DataTable
        data={filteredPages}
        columns={columns}
        title="All Pages"
      />
    </div>
  );
}
